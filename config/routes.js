'use strict';

const errorhandler = require('api-error-handler');
const thing = require('../app/controllers/thing');

module.exports = function (app) {
  app.get('/', (req, res) => res.render('index', { title: 'Express' }));

  app.get('/api/things', thing.index);
  app.post('/api/things', thing.create);
  app.get('/api/things/:id', thing.show);
  app.put('/api/things/:id', thing.update);
  app.delete('/api/things/:id', thing.destroy);

  app.use(errorhandler());
};
