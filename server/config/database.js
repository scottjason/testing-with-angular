const pg = require('pg')
const pgUri = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'postgres://localhost:5432/todos'

exports.createTables = () => {
  var client = new pg.Client(pgUri)
  client.connect()
  var query = client.query('CREATE TABLE if not exists users(id SERIAL PRIMARY KEY, email VARCHAR(256), password VARCHAR(256))')
  query.on('end', () => {
    console.log('Users table created')
    client.end()
  })
}
