const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../.');
const SRC_PATH = path.resolve(PROJECT_ROOT, 'src');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.s?css$/,
    use: [
      'style-loader',
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
            includePaths: [path.join(PROJECT_ROOT, './src/styles')],
          },
          additionalData: `@import "index";`,
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
      },
    ],
  });
  
  config.resolve.alias = {
    '@src': SRC_PATH,
  };

  const fileLoaderRule = config.module.rules.find(
    (rule) => rule.test && rule.test.test(".svg")
  );
  
  fileLoaderRule.exclude = /\.svg$/;

  // don't forget to return.
  return config;
};
