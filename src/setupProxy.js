const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/v0/dns/domains/wowman/nameserver',
    createProxyMiddleware({
      target: 'https://www.namebase.io',
      changeOrigin: true,
    })
  );
};