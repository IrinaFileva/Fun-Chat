const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const {CleanWebpackPlugin }= require('clean-webpack-plugin');


const baseConfig = {
  entry: path.resolve(__dirname, './src/index'),
  mode: 'development',
  module: {
      rules: [
          {
              test: /\.(html)$/i,
              use: ['html-loader']
          },
          {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
          },
          {
              test: /\.ts$/i,
              use: 'ts-loader',
          },
          {
              test: /\.(jpg|png|svg|jpeg|gif)$/i,
              type: 'asset/resource',
          },
      ],
  },
  resolve: {
      extensions: ['.ts', '.js'],
  },
  output: {
      filename: 'index.js',
      path: path.resolve(__dirname, './dist'),
      assetModuleFilename: 'accets/[hash][ext][query]'
  },
  plugins: [
      new HtmlWebpackPlugin(),
      new CleanWebpackPlugin(),
      new ESLintPlugin({ extensions: 'ts' }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  // eslint-disable-next-line global-require
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};