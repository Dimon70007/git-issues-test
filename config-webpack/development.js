
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
const publicPath = '/'; // join(__dirname, '../dist');

module.exports = Merge(CommonConfig({ publicPath }), {
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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
            ['env', { modules: false }],
              'stage-0',
              'react',
            ],
            plugins: [
              'transform-runtime',
              'react-hot-loader/babel',
            ],
          },
        },
      },
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        PUBLIC_URL: publicPath,
      },
    }),
  ],
});
