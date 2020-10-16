// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'mysql'
import { promisify } from 'util'
import BaseAdapter, { IAdapter } from './base'

export default class MySQLConnection extends BaseAdapter implements IAdapter {
  private promisifiedQuery

  constructor(private connection: Connection) {
    super()
    this.promisifiedQuery = promisify(this.connection.query)
  }

  async query(sqlQuery: string): Promise<Record<string, string>[]> {
    const result = await this.promisifiedQuery.apply(this.connection, [sqlQuery])

    if (result.insertId) {
      this.lastInsertId = result.insertId
    }

    return result
  }
}
