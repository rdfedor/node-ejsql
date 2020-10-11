import BaseAdapter, { IAdapter } from '../adapters/base'
import * as Loader from '../loader'
import { CompiledQuery } from '../query'

class MockAdapter extends BaseAdapter implements IAdapter {
  constructor(private queryFn) {
    super()
  }

  async query(sqlQuery: string): Promise<Record<string, string>[]> {
    return this.queryFn(sqlQuery)
  }

  // eslint-disable-next-line class-methods-use-this
  escape(strValue: string) {
    return strValue.replace('|', '||')
  }
}

describe('Loader', () => {
  let spyResult = null
  const spyFn = jest.fn((result) => {
    spyResult = result
  })

  const mockAdapter = new MockAdapter(spyFn)

  let queries: Record<string, CompiledQuery | Record<string, CompiledQuery>>

  it('BaseAdapter getLastInsertId should return null', () => {
    expect(mockAdapter.getLastInsertId()).toEqual(null)
  })

  it('should camelcase filenames', () => {
    expect(Loader.camelcaseString('test-case')).toEqual('testCase')
    expect(Loader.camelcaseString('testCase')).toEqual('testCase')
    expect(Loader.camelcaseString('TestCase')).toEqual('TestCase')
    expect(Loader.camelcaseString('multi-test-case')).toEqual('multiTestCase')
  })

  it('should load a directory of ejs queries', async () => {
    queries = await Loader.default(`${__dirname}/ejsql/`, mockAdapter)

    expect(Object.keys(queries).length).toEqual(2)
    expect(queries.testLoader).toBeDefined()
    // eslint-disable-next-line dot-notation
    expect(queries.testLoader['next']).toBeDefined()
  })

  it('should submit sql when called', async () => {
    await queries.testLoader()

    expect(spyResult).toEqual('select * from table LIMIT 100;')
  })

  it('should add values to sql when called with parameters', async () => {
    const username = 'johndoe'
    await queries.testLoader1.next({
      username
    })

    expect(spyResult).toContain(username)
  })
})
