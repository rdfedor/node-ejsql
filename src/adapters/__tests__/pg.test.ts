import { mock } from 'jest-mock-extended'
// eslint-disable-next-line import/no-unresolved
import { Client } from 'pg'
import { IAdapter } from '../base'
import PGConnection from '../pg'

describe('PGConnection', () => {
  const mockDatabaseConnection = mock<Client>()
  let adapterConnection: IAdapter = null

  it('should initialize a PG adapter class', () => {
    adapterConnection = new PGConnection(mockDatabaseConnection)
    expect(adapterConnection).toBeDefined()
    expect(adapterConnection.query).toBeDefined()
  })

  it('should make queries through mock database', () => {
    adapterConnection.query('SELECT TRUE;')

    expect(mockDatabaseConnection.query).toHaveBeenCalledTimes(1)
  })
})
