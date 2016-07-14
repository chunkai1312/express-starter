'use strict';

const errorhandler = require('errorhandler');
const thing = require('../app/controllers/thing');

module.exports = function (app) {
  // routes
  app.get('/', (req, res) => res.render('index', { title: 'Express' }));
  app.get('/api/things', thing.index);
  app.post('/api/things', thing.create);
  app.get('/api/things/:id', thing.show);
  app.put('/api/things/:id', thing.update);
  app.delete('/api/things/:id', thing.destroy);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(errorhandler());
};
