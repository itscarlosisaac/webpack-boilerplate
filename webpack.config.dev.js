require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');
const devMode = process.env.NODE_ENV === 'development';

module.exports = () => {
  const MiniCSSExtract = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  });

  const CopyWebpack = new CopyWebpackPlugin([
    { from: path.resolve(srcDir, 'public'), to: 'public' },
  ]);

  const StyleLinter = new StyleLintPlugin();

  const BSPlugin = new BrowserSyncPlugin({
    open: false,
    port: process.env.BROWSER_SYNC_PORT,
    proxy: `http://localhost:${process.env.WEBPACK_SERVER_PORT}`,
  }, {
    reload: true,
  });

  const HMR = new webpack.HotModuleReplacementPlugin();
  const HTMLWebpackPlugin = new HtmlWebpackPlugin({
    meta: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'UTF-8',
    },
  });

  return {
    mode: 'development',
    entry: './src/app.js',
    output: {
      filename: 'app.bundle.js',
      path: distDir,
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
        }, {
          test: /\.(sa|sc|c)ss$/,
          use: [
            !devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader', 'postcss-loader', 'sass-loader',
          ],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000',
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
      ],
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [CopyWebpack, HMR, MiniCSSExtract, BSPlugin, HTMLWebpackPlugin, StyleLinter],
    devServer: {
      host: '0.0.0.0',
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, 'src'),
      watchContentBase: true,
      stats: {
        colors: true,
        chunks: false,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      port: process.env.WEBPACK_SERVER_PORT || 8000,
    },
  };
};
