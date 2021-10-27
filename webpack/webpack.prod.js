const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = require('./webpack.base.js');
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.resolve(PROJECT_ROOT, 'public');

module.exports = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
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
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
  ],
});
