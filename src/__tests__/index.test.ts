import { Adapters, Query, Loader, Parser } from '..'

describe('Loader', () => {
  it('contains references to the libraries', () => {
    expect(Adapters).toBeDefined()
    expect(Query).toBeDefined()
    expect(Loader).toBeDefined()
    expect(Parser).toBeDefined()
  })
})
