'use strict'

const path = require('path')
const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const compression = require('compression')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const expressWinston = require('express-winston')
const config = require('../config')
const logger = require('./logger')

module.exports = function (app) {
  app.set('views', path.join(config.root, 'app', 'views'))
  app.set('view engine', 'html')
  app.engine('html', ejs.renderFile)
  app.use(express.static(`${config.root}/public`))
  app.use(expressLayouts)

  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(methodOverride())
  app.use(express.static(path.join(config.root, 'public')))

  app.get('env') === 'development'
    ? app.use(morgan('dev'))
    : app.use(expressWinston.logger({ winstonInstance: logger }))
}
