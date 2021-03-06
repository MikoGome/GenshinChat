const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve('client', 'index.tsx'),
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('client', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }]
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g)$/,
        type: 'asset/inline'
      }
    ]
  },
  devServer: {
    static: path.resolve('build'),
    port: 8080,
    proxy: {
      '/': 'http://localhost:3000'
    },
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'assets': path.resolve('client', 'assets')
    }
  }
}