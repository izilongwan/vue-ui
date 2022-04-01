const base = require('./base')

const { VueLoaderPlugin } = require('vue-loader'),
      HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({}, base, {
  mode: 'development',

  entry: '/src/test/index.ts',

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),
  ],

  devServer: {
    port: 3002,
    compress: true,
    hot: true,
  }
})


exports = {}
