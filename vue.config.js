const webpack = require('webpack');  

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(json|geojson)$/,
          loader: 'json-loader'
      },
      ]
    }
  },

  devServer: {
    port: 8300,
    disableHostCheck: true,
  },

  lintOnSave: 'warning',

}