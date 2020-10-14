// eslint-disable-next-line import/no-extraneous-dependencies
import * as sqlite3 from 'sqlite3'
import { join } from 'path'
import { getQuery, Adapters } from '../src'

const sqlite = sqlite3.verbose()

const runner = async () => {
  try {
    const db = new sqlite.Database(':memory:')

    const adapter = new Adapters.SQLiteConnection(db)

    const createTable = await getQuery(join(__dirname, './ejsql/create-table.sql.ejs'), adapter)

    await createTable()

    const addUser = await getQuery(join(__dirname, './ejsql/add-user.sql.ejs'), adapter)

    await addUser({
      user: ['John Doe', 'johndoe@example.com']
    })

    await addUser({
      users: [
        ['Jane Doe', 'janedoe@example.com'],
        ['Trixy Doe', 'trixy@example.com']
      ]
    })

    const getUsers = await getQuery(join(__dirname, './ejsql/get-users.sql.ejs'), adapter)

    console.log('Return all users')
    // List all users
    console.log(await getUsers())

    console.log('Return user 1 and 2')
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
