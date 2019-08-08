module.exports = {
  proxy: {
    '/prod': {
      target: 'http://47.92.209.177:8080/tej.manger/rest',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/prod':'/'
      }
    },
    '/api': {
      target: 'https://www.easy-mock.com/mock/5d119aa1e8830023398fe939',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api':'/'
      }
    },
    '/yz': {
      target: 'http://192.168.1.107:8080/tej/rest',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/yz':'/'
      }
    },
    '/wd': {
      target: 'http://192.168.1.114:8080/tej/rest',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/wd':'/'
      }
    }
  }
}
