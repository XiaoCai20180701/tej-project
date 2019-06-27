module.exports = {
  proxy: {
    '/api': {
      target: 'https://www.easy-mock.com/mock/5d119aa1e8830023398fe939',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api':'/'
      }
    }
  }
}
