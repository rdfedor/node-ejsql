export interface IAdapter {
  query(sqlQuery: string): Promise<unknown>
}

export default class BaseAdapter {
  protected lastInsertId = null

  getLastInsertId(): null | number {
    return this.lastInsertId
  }
}
