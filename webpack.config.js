const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');



module.exports = {
  mode: 'development',

  entry: './src/script.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './src/index.html' // шлях до вашого оригінального html
    })
  ],

  devServer: {
    static: './dist',
    port: 8080,
    open: true,
  },
};