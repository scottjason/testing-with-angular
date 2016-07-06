const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const rootDir = path.join( __dirname, '../')

require('./config/database').createTables()

const app = express()
const port = process.env.PORT || 3000

require('colors')

app.set('views', path.join(rootDir, 'server/views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(rootDir, 'dist')))

require('./routes')(app)

app.listen(port, () => {
  console.log('Server listening to port:'.green, port.toString().green)
})
