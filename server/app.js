const path = require('path')
const express = require('express')
const logger = require('morgan')
const database = require('./config/database')
const rootDir = path.join( __dirname, '../')

database.connect()

const app = express()
const port = process.env.PORT || 3000

require('colors')

app.set('views', path.join(rootDir, 'server/views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(express.static(path.join(rootDir, 'dist')))

// todo: add auth and routes
app.get('*', (req, res, next) => res.render('index'))

app.listen(port, () => {
  console.log('Server listening to port:'.green, port.toString().green)
})
