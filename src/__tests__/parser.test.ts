import ParseTemplate from '../parser'

describe('Parser', () => {
  it('should format objects for sql', async () => {
    const template = ParseTemplate(`
      SELECT
        *
      FROM table
      WHERE email LIKE {%= '%' + email %}
      AND id IN {%: ids %}
      AND createdAt < {%- 'CURRENT_TIMESTAMP' %}
    `)

    const sql = await template({ ids: [1, 2, 3], email: '@gmail.com' })
    expect(sql).toContain("'%@gmail.com'")
    expect(sql).toContain('IN 1,2,3')
  })

  it('should format sql without data', async () => {
    const template = ParseTemplate('SELECT * FROM table')

    const sql = template()
    expect(sql).toBeDefined()
  })
})
