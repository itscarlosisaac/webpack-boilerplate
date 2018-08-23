require('dotenv').config();
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');
const devMode = process.env.NODE_ENV === 'development';

module.exports = () => {
  const MiniCSSExtract = new MiniCssExtractPlugin({
    filename: '[name]-[hash].css',
    chunkFilename: '[id]-[hash].css',
  });

  const CopyWebpack = new CopyWebpackPlugin([
    { from: path.resolve(srcDir, 'public'), to: 'public' },
  ]);

  const StyleLinter = new StyleLintPlugin();

  const HTMLWebpackPlugin = new HtmlWebpackPlugin({
    meta: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'UTF-8',
    },
    hash: true,
    minify: true,
  });

  return {
    mode: 'production',
    entry: './src/app.js',
    output: {
      filename: 'app.bundle.[hash].js',
      path: distDir,
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
        },{
          test: /\.(sa|sc|c)ss$/,
          use: [
            !devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader', 'postcss-loader', 'sass-loader',
          ],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff&name=&name=/css/webfonts/[name].[ext]',
        },
        {
          test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'file-loader?limit=10000&mimetype=application/font-woff&name=&name=/css/webfonts/[name].[ext]',
        },
      ],
    },
    devtool: 'source-map',
    plugins: [CopyWebpack, MiniCSSExtract, HTMLWebpackPlugin, StyleLinter],
  };
};
