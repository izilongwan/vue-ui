const base = require('./base')

const { VueLoaderPlugin } = require('vue-loader')

const path = require('path')

module.exports = Object.assign({}, base, {
  mode: 'production',

  entry: path.resolve(__dirname, '../src/components/index.js'),

  output: {
    filename: 'index.js',
    library: {
      type: 'umd',
      name: 'VueUI',    
      export: 'default',
      // umdNamedDefine: true,
    },
    globalObject: 'this',
    clean: true,
  },

  plugins: [
    new VueLoaderPlugin(),
  ],
})
