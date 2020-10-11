import { promises as fs } from 'fs'
import { IAdapter } from './adapters/base'
import parse from './parser'

export type CompiledQuery = (parameters?: Record<string, string>) => Promise<Record<string, string>[]>

export default class Query {
  // eslint-disable-next-line no-useless-constructor
  constructor(private templatePath: string, private connection: IAdapter) {}

  async compile(): Promise<CompiledQuery> {
    const rawText = await fs.readFile(this.templatePath)

    const ejsTemplate = parse(rawText.toString())

    return async (parameters: Record<string, string> = {}): Promise<Record<string, string>[]> => {
      return this.connection.query(await ejsTemplate(parameters))
    }
  }
}
