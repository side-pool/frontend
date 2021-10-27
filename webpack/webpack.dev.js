const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.js');
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.resolve(PROJECT_ROOT, 'public');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    port: '5050',
    host: '127.0.0.1',
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://13.209.171.179:80',
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.join(PROJECT_ROOT, './src/assets/styles')],
              },
              additionalData: `@import "index";`,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(TEMPLATE_PATH, 'index.html'),
      minify: {
        removeComments: true,
      },
    }),
  ],
});
