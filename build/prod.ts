const base = require('./base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { VueLoaderPlugin } = require('vue-loader')

const path = require('path')

module.exports = Object.assign({}, base, {
  mode: 'production',

  entry: path.resolve(__dirname, '../src/index.ts'),

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

  externals: {
    vue: {
      root: "Vue",
      commonjs2: "vue",
      commonjs: "vue",
      amd: "vue"
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    }),
  ],
})

export {}
