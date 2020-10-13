// eslint-disable-next-line import/no-extraneous-dependencies
import { Client, QueryResult } from 'pg'
import BaseAdapter, { IAdapter } from './base'

export default class PGConnection extends BaseAdapter implements IAdapter {
  constructor(private connection: Client) {
    super()
  }

  async query(sqlQuery: string): Promise<QueryResult<unknown>> {
    return this.connection.query(sqlQuery)
  }
}
