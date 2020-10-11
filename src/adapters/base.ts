export interface IAdapter {
  query(sqlQuery: string): Promise<Record<string, string>[]>
}

export default class BaseAdapter {
  protected lastInsertId = null

  getLastInsertId(): null | number {
    return this.lastInsertId
  }
}
