// eslint-disable-next-line import/no-extraneous-dependencies
import { Database } from 'sqlite3'
import { promisify } from 'util'
import BaseAdapter, { IAdapter } from './base'

export default class SQLiteConnection extends BaseAdapter implements IAdapter {
  private promisifiedQuery

  constructor(private connection: Database) {
    super()
    this.promisifiedQuery = promisify(this.connection.all)
  }

  async query(sqlQuery: string): Promise<Record<string, string>[]> {
    return this.promisifiedQuery.apply(this.connection, [sqlQuery])
  }
}
