import { mock } from 'jest-mock-extended'
import { Database } from 'sqlite3'
import { IAdapter } from '../base'
import SQLiteConnection from '../sqlite'

describe('SQLiteConnection', () => {
  const mockDatabaseConnection = mock<Database>()
  let adapterConnection: IAdapter = null

  it('should initialize a SQLite adapter class', () => {
    adapterConnection = new SQLiteConnection(mockDatabaseConnection)
    expect(adapterConnection).toBeDefined()
    expect(adapterConnection.query).toBeDefined()
  })

  it('should make queries through Database.all', () => {
    adapterConnection.query('SELECT TRUE;')

    expect(mockDatabaseConnection.all).toHaveBeenCalledTimes(1)
  })
})
