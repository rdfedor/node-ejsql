import { mock } from 'jest-mock-extended'
// eslint-disable-next-line import/no-unresolved
import { ConnectionPool } from 'mssql'
import { IAdapter } from '../base'
import MSSQLConnection from '../mssql'

describe('MSSQLConnection', () => {
  const mockDatabaseConnection = mock<ConnectionPool>()
  let adapterConnection: IAdapter = null

  it('should initialize a MSSql adapter class', () => {
    adapterConnection = new MSSQLConnection(mockDatabaseConnection)
    expect(adapterConnection).toBeDefined()
    expect(adapterConnection.query).toBeDefined()
  })

  it('should make queries through Database.all', () => {
    adapterConnection.query('SELECT TRUE;')

    expect(mockDatabaseConnection.query).toHaveBeenCalledTimes(1)
  })
})
