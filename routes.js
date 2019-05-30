const routes = require('next-routes');

module.exports = routes()
  .add('index')
  .add('channel', '/:slug.:id')
  .add('podcast', '/:slugChannel.:idChannel/:slug.:id');
