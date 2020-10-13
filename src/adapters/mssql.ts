// eslint-disable-next-line import/no-extraneous-dependencies
import { ConnectionPool, IResult } from 'mssql'
import BaseAdapter, { IAdapter } from './base'

export default class MSSQLConnection extends BaseAdapter implements IAdapter {
  constructor(private connection: ConnectionPool) {
    super()
  }

  async query(sqlQuery: string): Promise<IResult<unknown>> {
    return this.connection.query(sqlQuery)
  }
}
