/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/independents', require('./api/independent'));
  app.use('/api/infringements', require('./api/infringement'));
  app.use('/api/inspections', require('./api/inspection'));
  app.use('/api/sessions', require('./api/session'));
  app.use('/api/locations', require('./api/location'));
  app.use('/api/vehicles', require('./api/vehicle'));
  app.use('/api/companys', require('./api/company'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};