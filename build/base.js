const path = require('path')

module.exports = {
  entry: '/src/index.js',

  output: {
    filename: 'index.js',
    clean: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },

    extensions: ['.ts', '.js', '.jsx', '.vue', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      }
    ]
  },
}
