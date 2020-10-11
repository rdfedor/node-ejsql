import { escape } from 'sqlstring'

export interface IAdapter {
  query(sqlQuery: string): Promise<Record<string, string>[]>
  escape(strValue: string): string
}

export default class BaseAdapter {
  protected lastInsertId = null

  protected escapeFn = null

  constructor() {
    this.escapeFn = escape
  }

  getLastInsertId(): null | number {
    return this.lastInsertId
  }

  escape(strValue: string): string {
    return this.escapeFn(strValue)
  }
}
