# EJSQL

[![Package Version](https://img.shields.io/github/package-json/v/rdfedor/node-ejsql)](https://gitlab.com/rdfedor/node-ejsql) [![License](https://img.shields.io/github/license/rdfedor/node-ejsql.svg)](https://gitlab.com/rdfedor/node-ejsql/blob/master/LICENSE) [![pipeline status](https://gitlab.com/rdfedor/node-ejsql/badges/master/pipeline.svg)](https://gitlab.com/rdfedor/node-ejsql/-/commits/master) [![coverage report](https://gitlab.com/rdfedor/node-ejsql/badges/master/coverage.svg)](https://rdfedor.gitlab.io/node-ejsql/lcov-report/)[![GitHub top language](https://img.shields.io/github/languages/top/rdfedor/node-ejsql)](https://gitlab.com/rdfedor/node-ejsql)

EJSQL is a light weight cross-database interface that creates templatized SQL across MySQL, SQLite, MSSQL and Postgres. API documentation is available [here](https://rdfedor.gitlab.io/node-ejsql/).

## Background

> Over time as an engineer, we like to write good old SQL queries without the overhead or restrictions of a complex ORM.  ORMs can introduce complexities where simple aggregation becomes troublesome to implement because it has to conform to a way the ORM can understand.
>
> Over time though, as features are implemented and queries become more spread out over multiple functions, it can become difficult to see how changes affect the big picture of what the query is supposed to look like.
>
> This project aims to simplify the process of creating complex queries without sacrificing code readability.  Better readability in how SQL is generated means fewer errors would be missed during code review.

## Installation

Open your terminal and type in

via npm,
```sh
$ npm install --save node-ejsql
```

or via Yarn,
```sh
$ yarn add node-ejsql
```

## Usage

EJSQL leverages [Embedded JavaScript](https://ejs.co/) to handle templating of the SQL with [SqlString](https://www.npmjs.com/package/sqlstring) providing escaping and formatting for JavaScript objects. 

### Features of EJSQL

* uses `{` and `}` instead of `<` and `>` for command delemiters
* escape template values using `{%- 'test' %}`
* creates format objects syntax using `{%: [1,2,3] %}`

### Command Line Interface

EJSQL comes with a command line interface that allows for an sql.ejs file to be ran from command line.  If the package is installed globally, `ejsql` should be available via command line and if installed locally, it can be accessed through `npx ejsql`.

```
Usage: ejsql [options] <filename> [...filenames]

Runs a templatized sql.ejs file against a database. When using an adapter, make sure the adapter's companion module is installed (mssql, mysql, sqlite3, pg). See https://rdfedor.gitlab.io/node-ejsql/ for additional details.

Options:
  -V, --version                              output the version number
  -a, --adapter <database_adapter>           The database type mssql, mysql, pg, sqlite (default: "sqlite")
  -h, --host <database_host>                 The path to the database host (default: "localhost")
  -n, --dbname <database_name>               The name of the default database (default: "master")
  -u, --user <database_user>                 The username associated with the database login (default: "root")
  -p, --pass <database_pass>                 The password associated with the database login (default: "")
  -d, --data [var1=val1,var2=val2,...]       Pass data to the template as a name value pair (default: "")
  -c, --connector [var1=val1,var2=val2,...]  Add additional options for the database connection (default: "")
  -s, --skipHeaders                          Disables the output of the headers (default: false)
  --help                                     display help for command
```

## Supported Adapters

  - [mssql](https://www.npmjs.com/package/mssql)
  - [mysql](https://www.npmjs.com/package/mysql)
  - [pg](https://www.npmjs.com/package/pg)
  - [sqlite3](https://www.npmjs.com/package/sqlite3)

## Quickstart

This quickstart assumes that there's an existing database and table called users with data.

* Create an `ejsql` directory in your source directory.
* Create `list-users.sql.ejs` in the `ejsql` directory with the following contents,
```
SELECT 
{% if (typeof count !== 'undefined') { %}
    count(*) as countUsers
{% } else { %}
    * 
{% } %}
FROM users
WHERE 1=1
{% if (typeof email !== 'undefined') { %}
    AND email LIKE {%: `%${email}%` %}
{% } %}
```

* Create `index.js` in the root of the source directory with the following contents,

```
const mysql = require("mysql")
const { join } = require('path')
const { Adapters, Loader } = require("node-ejsql")

// Create a connection the adapter will use
const connection = mysql.createConnection({
  host : '127.0.0.1',
  port : 3307,
  database : 'test-database'
})
// Create the adapter
const adapter = new Adapters.MySQLConnection(connection)

// Load our queries
const queries = Loader(join(__dirname, './ejsql'), adapter)

// Do something
async function foo() {
  const rows = await queries.listUsers({
      count: true,
      email: '@gmail.com'
  })
  rows.map(row => {
    console.log('Total Users: ' + row.countUsers)
  })
}
foo()
```

Additional examples can be found [here](https://gitlab.com/rdfedor/node-ejsql/-/tree/master/examples) and API documentation can be found [here](https://rdfedor.gitlab.io/node-ejsql/).

## Bugs

If you have questions, feature requests or a bug you want to report, please click [here](https://gitlab.com/rdfedor/node-ejsql/-/issues/new) to file an issue.

## Author

* [**Roger Fedor**](https://rdfedor.gitlab.io/) [![GitHub followers](https://img.shields.io/github/followers/rdfedor.svg?style=social)](https://gitlab.com/rdfedor) [![Twitter Follow](https://img.shields.io/twitter/follow/rdfedor.svg?style=social)](https://twitter.com/rdfedor)

## Support

Like what you see? Keep me awake at night by buying me a coffee or two.

<a href="https://www.buymeacoffee.com/rdfedor" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;"></a>

## License

Copyright (c) 2020 Roger Fedor.

Usage is provided under the MIT License. See [LICENSE](https://gitlab.com/rdfedor/node-ejsql/-/blob/master/LICENSE) for the full details.
