import { promises as fs } from 'fs'
import { IAdapter } from './adapters/base'
import parse from './parser'

export type CompiledQuery = (parameters?: Record<string, string>) => Promise<unknown>

/**
 * Class that reads a file based ejs template
 */
export default class Query {
  // eslint-disable-next-line no-useless-constructor
  constructor(private templatePath: string, private connection: IAdapter) {}

  /**
   * Returns a callacble function to execute the query against a particular connection
   */
  async compile(): Promise<CompiledQuery> {
    const rawText = await fs.readFile(this.templatePath)

    const ejsTemplate = parse(rawText.toString())

    return async (parameters: Record<string, string> = {}): Promise<unknown> => {
      return this.connection.query(await ejsTemplate(parameters))
    }
  }
}
