import { mock } from 'jest-mock-extended'
// eslint-disable-next-line import/no-unresolved
import { Connection } from 'mysql'
import { IAdapter } from '../base'
import MySQLConnection from '../mysql'

describe('MySQLConnection', () => {
  const mockDatabaseConnection = mock<Connection>()
  let adapterConnection: IAdapter = null

  it('should initialize a MySQL adapter class', () => {
    adapterConnection = new MySQLConnection(mockDatabaseConnection)
    expect(adapterConnection).toBeDefined()
    expect(adapterConnection.query).toBeDefined()
  })

  it('should make queries through mock database', () => {
    adapterConnection.query('SELECT TRUE;')

    expect(mockDatabaseConnection.query).toHaveBeenCalledTimes(1)
  })
})
