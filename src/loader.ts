import { promises as fs } from 'fs'
import { basename, join } from 'path'
import { IAdapter } from './adapters/base'
import Query, { CompiledQuery } from './query'

export function camelcaseString(strValue: string): string {
  return strValue
    .split('.')
    .shift()
    .split('-')
    .map((val, index) => `${index !== 0 ? val[0].toUpperCase() : val[0]}${val.substr(1)}`)
    .join('')
}

async function loadDirectory(
  dirPath: string,
  connection: IAdapter
): Promise<Record<string, CompiledQuery | Record<string, CompiledQuery>>> {
  const files = (await fs.readdir(dirPath)).map((file) => join(dirPath, file))

  const ejsTemplatePaths = []

  await Promise.all(
    files.map(async (fullPath) => {
      if (fullPath.split('.').pop() === 'ejs') {
        const stat = await fs.stat(fullPath)
        if (stat.isFile()) {
          ejsTemplatePaths.push(fullPath)
        }
      }
    })
  )

  const ejsTemplates = {}

  await Promise.all(
    ejsTemplatePaths.map(async (ejsPath) => {
      const queryName = camelcaseString(basename(ejsPath))
      const query = new Query(ejsPath, connection)
      ejsTemplates[queryName] = await query.compile()
    })
  )

  const ejsDirectories = []
  await Promise.all(
    files.map(async (fullPath) => {
      if (fullPath.split('.').pop() !== 'ejs') {
        const stat = await fs.stat(fullPath)

        if (stat.isDirectory()) {
          ejsDirectories.push(fullPath)
        }
      }
    })
  )

  await Promise.all(
    ejsDirectories.map(async (directoryPath) => {
      const directoryName = camelcaseString(basename(directoryPath))
      const directoryTemplates = await loadDirectory(join(directoryPath, '/'), connection)

      if (!ejsTemplates[directoryName]) {
        ejsTemplates[directoryName] = directoryTemplates
      } else {
        Object.keys(directoryTemplates).forEach((queryName) => {
          ejsTemplates[directoryName][queryName] = directoryTemplates[queryName]
        })
      }
    })
  )

  return ejsTemplates
}

export default async function initializeLoader(
  dirPath: string,
  connection: IAdapter
): Promise<Record<string, CompiledQuery | Record<string, CompiledQuery>>> {
  return loadDirectory(dirPath, connection)
}
