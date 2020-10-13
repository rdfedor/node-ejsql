// eslint-disable-next-line import/no-extraneous-dependencies
import * as sqlite3 from 'sqlite3'
import { join } from 'path'
import { Query, Adapters } from '../../src'

const sqlite = sqlite3.verbose()

const runner = async () => {
  try {
    const db = new sqlite.Database(':memory:')

    const adapter = new Adapters.SQLiteConnection(db)

    const createTable = await new Query(join(__dirname, '../ejsql/create-table.sql.ejs'), adapter).compile()

    await createTable()

    const getUsers = await new Query(join(__dirname, '../ejsql/get-users.sql.ejs'), adapter).compile()

    // List all users
    console.log(await getUsers())

    // List users 1 and 2
    console.log(
      await getUsers({
        id: [1, 2]
      })
    )
  } catch (err) {
    console.log(err)
  }
}

runner()
