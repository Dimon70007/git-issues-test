const webpack = require('webpack');
const Merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonConfig = require('./common');

const extractCss = new ExtractTextPlugin({
  filename: 'styles.css',
  disable: false,
  allChunks: true,
});
const lessUseProd = [
  {
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]',
      constLoaders: 1,
      sourceMap: true,
      '-minimize': true,
    },
  },
  {
    loader: 'less-loader',
    query: {
      sourceMap: true,
    },
  },
];
const cssConfig = extractCss.extract({
  fallback: 'style-loader',
  use: lessUseProd.slice(0, -1),
});
const lessConfig = extractCss.extract({
  fallback: 'style-loader',
  use: lessUseProd,
});
const publicPath = 'https://dimon70007.github.io/git-issues-test/'; // join(__dirname, '../dist');

module.exports = Merge(CommonConfig({ publicPath }), {
  devtool: 'cheap-module-source-map',
  entry: [
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
            ],
            // comments: false,
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
    extractCss,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PUBLIC_URL: JSON.stringify(publicPath),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
  ],
});
