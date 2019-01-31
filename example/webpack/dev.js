const { resolve } = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: [resolve(__dirname, '../src/index.js')],
  output: {
    path: resolve(__dirname, '../dist/js'),
    filename: 'app.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:4]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')('last 2 versions', 'ie 10')
              ]
            }
          },
          'sass-loader'
        ]
      },
    ]
  }
};