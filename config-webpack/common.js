const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackTemplate = require('html-webpack-template');
const { join } = require('path');

const path = join(__dirname, '../dist');

module.exports = ({ publicPath }) => ({
  output: {
    // library: 'gitIssuesTest',
    path,
    filename: 'bundle.js', // '[name].bundle.js',
    publicPath,
    // sourceMapFilename: 'bundle.map', // '[name].map', by default [file].map
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
        use: 'eslint-loader',
      },
      {
        test: /\.(jpe?g|png|svg)$/i,
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
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'old_index.html',
      // Required
      // inject: false,
      // template: HtmlWebpackTemplate,
      // template: 'node_modules/html-webpack-template/index.ejs',
      //
      // Optional
      // appMountId: 'root',
      // baseHref: 'https://dimon70007.github.io/git-issues-test/',
      // devServer: 'http://localhost:3000',
      // googleAnalytics: {
      //   trackingId: 'UA-XXXX-XX',
      //   pageViewOnLoad: true,
      // },
      // meta: [
      //   {
      //     name: 'description',
      //     content: 'A better default template for html-webpack-plugin.',
      //   },
      // ],
      // // mobile: true,
      // links: [
      //   'https://fonts.googleapis.com/css?family=Roboto',
      //   {
      //     href: '/apple-touch-icon.png',
      //     rel: 'apple-touch-icon',
      //     sizes: '180x180',
      //   },
      //   {
      //     href: '/favicon-32x32.png',
      //     rel: 'icon',
      //     sizes: '32x32',
      //     type: 'image/png',
      //   },
      // ],
      // inlineManifestWebpackName: 'webpackManifest',
      // scripts: [
      //   'http://example.com/somescript.js',
      //   {
      //     src: '/myModule.js',
      //     type: 'module',
      //   },
      // ],
      // title: 'My App',
      // window: {
      //   env: {
      //     apiHost: 'http://myapi.com/api/v1',
      //   },
      // },

      // And any other config options from html-webpack-plugin:
      // https://github.com/ampedandwired/html-webpack-plugin#configuration
    }),
  ],
});
