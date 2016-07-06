const router = require('express').Router()
const pg = require('pg')
const bcrypt = require('bcrypt')
const pgUri = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'postgres://localhost:5432/todos'

module.exports = (app) => {
  router.get('/', (req, res) => res.render('index'))
  router.post('/login', onLogin)
  router.post('/signup', onSignup)
  app.use(router)
}

function comparePassword(entered, existing, cb) {
  bcrypt.compare(entered, existing, (err, isMatch) => cb(err, isMatch))
}

function onLogin(req, res, next) {
  var client = new pg.Client(pgUri)
  client.connect()
  var query = client.query('select * from users where email=$1', [req.body.email])
  query.on('end', (result) => {
    if (!result.rows.length) {
      res.status(401).send({ message: 'account not found' })
      client.end()
    } else {
      var user = result.rows[0]
      comparePassword(req.body.password, user.password, (err, isMatch) => {
        if (err) return next(err)
        user.password = null
        if (isMatch) return res.status(200).send({ user: user })
        res.status(401).send({ message: 'right email, wrong password' })
        client.end()
      })
    }
  })
}

function onSignup(req, res, next) {
  var client = new pg.Client(pgUri)
  client.connect()
  var query = client.query('select * from users where email=$1', [req.body.email])
  query.on('end', (result) => {
    if (result.rows.length) {
      res.status(401).send({ message: 'account exists' })
      client.end()
    } else {
      var query = client.query('INSERT INTO users(email, password) values($1, $2) RETURNING *', [req.body.email, bcrypt.hashSync(req.body.password, 10)])
      query.on('end', (result) => {
        result.rows[0].password = null
        res.status(200).send({ user: result.rows[0] })
        client.end()
      })
    }
  })
}
