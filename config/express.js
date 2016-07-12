'use strict';

const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const config = require('../config');
const logger = require('./logger');

module.exports = function (app) {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(methodOverride());
  app.use(express.static(path.join(config.root, 'public')));

  if (app.get('env') === 'development' || app.get('env') === 'test') {
    app.use(morgan('dev'));
  }

  if (app.get('env') === 'production') {
    app.use(morgan('dev', { stream: logger.stream }));
  }
};
