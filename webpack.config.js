const webpack = require('webpack');
const path = require('path');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'development',
  devServer: {
    port: 1234,
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              mimetype: 'image/png',
              limit: false,
            },
          },
        ],
      },
      // {
      //   test: /\.ts(x)?$/,
      //   loader: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                '@babel/preset-typescript',
                ['@babel/preset-react', { runtime: 'automatic' }],
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: ['>2%'],
                    },
                    modules: false,
                  },
                ],
              ],
              plugins: ['@vanilla-extract/babel-plugin'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new VanillaExtractPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = config;
