'use strict';

const errorhandler = require('api-error-handler');
const api = require('../app');

module.exports = function (app) {
  app.use('/api', api);
  app.get('/', (req, res) => res.render('index', { title: 'Express' }));
  app.use(errorhandler());
};
