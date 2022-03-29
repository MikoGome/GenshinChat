const path = require('path');

module.exports = {
  entry: path.resolve('dev', 'public', 'index.jsx'),
  output: {
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve('node_modules'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }]
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader'
          options: {
            presets: ['@babel/preset-typescript']
          }
        }]
      }
    ]
  },
  devServer: {
    static: path.resolve('dev', 'public'),
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  }
}