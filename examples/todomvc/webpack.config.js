var path = require('path')
var webpack = require('webpack')
var PureScriptWebpackPlugin = require('purescript-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new PureScriptWebpackPlugin({
      src: [ 'bower_components/purescript-*/src/**/*.purs', 'src/**/*.purs' ],
      ffi: [ 'bower_components/purescript-*/src/**/*.js' ],
      bundle: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.purs$/,
        loaders: [ 'purs' ],
        include: __dirname
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: __dirname
      }
    ]
  }
}
