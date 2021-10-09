const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../.');
const SRC_PATH = path.resolve(PROJECT_ROOT, 'src');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.s?css$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [path.join(PROJECT_ROOT, './src/styles')],
          },
          additionalData: `@import "index";`,
        },
      },
    ],
  });

  config.resolve.alias = {
    '@src': SRC_PATH,
  };

  // don't forget to return.
  return config;
};
