const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve('dev', 'src', 'index.tsx'),
  output: {
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('dev', 'src', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: path.resolve('node_modules'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }]
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    static: path.resolve('dist'),
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000'
    },
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}