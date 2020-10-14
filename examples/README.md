# Examples

These examples are executed from the root of the project source directory in order to include the configuration for the entire project.

[API Documentation](https://rdfedor.gitlab.io/node-ejsql/)

## sqlite-query-loader

Loads all the ejs.sql files automatically using the supplied loader.

```
yarn ts-node ./examples/sqlite-query-loader.ts
```

Output
```
yarn run v1.22.5
Return all users
[ { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
  { id: 3, name: 'Trixy Doe', email: 'trixy@example.com' } ]
Return user 1 and 2
[ { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' } ]
```

## sqlite-single-query

Loads each sql.ejs file individually without use of the loader.

```
yarn ts-node ./examples/sqlite-single-query.ts
```

Output
```
yarn run v1.22.5
Return all users
[ { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
  { id: 3, name: 'Trixy Doe', email: 'trixy@example.com' } ]
Return user 1 and 2
[ { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' } ]
```