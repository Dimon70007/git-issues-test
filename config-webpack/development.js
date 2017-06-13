
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./common');


const lessDev = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]',
      constLoaders: 1,
      sourceMap: true,
      '-minimize': true,
    },
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: true,
    },
  },
];
const cssConfig = lessDev.slice(0, -1);
const lessConfig = lessDev;

module.exports = Merge(CommonConfig, {
  devtool: 'cheap-module-eval-source-map',
  // devServer: {
  //   hot: true,
  //   contentBase: path,
  //   publicPath,
  // },
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index',
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssConfig,
      },
      {
        test: /\.less$/,
        use: lessConfig,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
