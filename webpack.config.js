const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { readEnv } = require('./config/env')

const env = readEnv()
const prod = process.env.NODE_ENV === 'production'

module.exports = {
  mode: process.env.NODE_ENV,

  entry: ['@babel/polyfill', 'src/entry.js'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods']
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.json', '.css'],
    alias: {
      'src': path.resolve(__dirname, 'src')
    }
  },

  performance: prod && {
    hints: 'warning',
    maxAssetSize: 200 * 1024,
    maxEntrypointSize: 400 * 1024
  },

  devtool: 'source-map',

  target: 'web',

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    hot: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Todoist Dashboard',
      template: 'index.ejs'
    }),
    new webpack.DefinePlugin({
      TODOIST_ACCESS_TOKEN: JSON.stringify(env.TODOIST_ACCESS_TOKEN),
      TODOIST_CLIENT_ID: JSON.stringify(env.TODOIST_CLIENT_ID),
      TODOIST_CLIENT_SECRET: JSON.stringify(env.TODOIST_CLIENT_SECRET)
    })
  ]
}
