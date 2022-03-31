const path = require('path')

module.exports = {
  entry: '/src/index.ts',

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
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|webp|jpeg|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'images/[name]-[contenthash:6].[ext]'
                }
              },

              limit: 1024 * 50
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 处理字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 20,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name]-[contenthash:6].[ext]'
                }
              }
            }
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },
}

export { }
