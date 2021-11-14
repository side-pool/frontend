const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST_PATH = path.resolve(PROJECT_ROOT, 'dist');
const SRC_PATH = path.resolve(PROJECT_ROOT, 'src');
const dotenv = require('dotenv');
const webpack = require('webpack');

dotenv.config();

module.exports = {
  entry: path.resolve(SRC_PATH, 'index.tsx'),
  output: {
    path: DIST_PATH,
    filename: '[name].js',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: path.resolve('src'),

        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.ts', '.jsx', '.tsx'],
    alias: {
      '@src': SRC_PATH,
    },
    modules: ['node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};
