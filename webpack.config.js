const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const extractCss = new ExtractTextPlugin({
  filename: 'styles.css',
  disable: !isProd,
  allChunks: true,
});
const lessDev = [
  'style-loader',
  {
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]',
      importLoaders: 1,
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
const lessUseProd = [
  {
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]',
      importLoaders: 1,
      sourceMap: false,
      '-minimize': true,
    },
  },
  {
    loader: 'less-loader',
    query: {
      sourceMap: false,
    },
  },
];
const cssProd = extractCss.extract({
  fallback: 'style-loader',
  use: lessUseProd.slice(0, -1),
});
const lessProd = extractCss.extract({
  fallback: 'style-loader',
  use: lessUseProd,
});
const cssConfig = isProd ? cssProd : lessDev.slice(0, -1);
const lessConfig = isProd ? lessProd : lessDev;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
  },
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /src\/store\/config\w*.js/,
          /\/w*.js/,
        ],
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.(jpe?g|png|svg)$/i,
        // exclude: /node_modules/,
        use: [
          'url-loader?limit=10000',
          'img-loader',
        ],
      },
      {
        test: /\.gif$/,
        use: [
          'url-loader?limit=10000&mimetype=image/png',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', { modules: false }],
                'stage-0',
                'react',
              ],
              plugins: [
                'react-hot-loader/babel',
                'transform-runtime',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: cssConfig,
      },
      {
        test: /\.less$/,
        use: lessConfig,
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'url-loader?limit=10000&mimetype=application/font-woff',
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'file-loader?name=[name].[ext]',
        ],
      },
    ],
  },
  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(), is on by default now
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    extractCss,
    // extractLess,
  ],
};
