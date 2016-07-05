const pg = require('pg')
const pgUri = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'postgres://localhost:5432/todos'
const bcrypt = require('bcrypt')

exports.connect = () => {
  var client = new pg.Client(pgUri)
  client.connect()
  var query = client.query('CREATE TABLE if not exists users(id SERIAL PRIMARY KEY, email VARCHAR(256), password VARCHAR(256))');
  query.on('end', () => {
    console.log('query ended, connected to database')
    client.end()
    createUser()
  })
}

function createUser() {
  var client = new pg.Client(pgUri)
  client.connect()
  var query = client.query('INSERT INTO users(email, password) values($1, $2)', ['scottleejason@gmail.com', bcrypt.hashSync('password', 10)])
  query.on('end', () => {
    console.log('query ended, inserted user')
    client.end()
  })  
}