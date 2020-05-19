//跨域需要的中间件，参考官网地址：https://create-react-app.dev/docs/proxying-api-requests-in-development
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      ws: true,
      pathRewrite: {
          '^/api': '',
      }
    })
  );
};