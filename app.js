'use strict'

const http = require('http')
const express = require('express')
const config = require('./config')
const logger = require('./config/logger')

const app = express()

require('./config/mongoose')()
require('./config/express')(app)
require('./config/routes')(app)

http.createServer(app).listen(config.port, config.ip, () => {
  logger.verbose('Express server listening on %d, in %s mode', config.port, app.get('env'))
})

module.exports = app
