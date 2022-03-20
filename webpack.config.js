const path = require('path');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  // mode: 'none',
  devServer: {
    port: 1234,
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  entry: path.join(__dirname, './src/index.ts'),
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    chunkFilename: '[name].[contenthash].chunk.js',
    // libraryTarget: 'var',
    // library: "webpackNumbers",
    library: {
      // name: 'devtools',
      type: 'module',
      // export: 'default',
    },
  },

  module: path.join(__dirname, './src/index.ts'),
  externals: [
    '@arekrado/canvas-engine',
    '@arekrado/vector-2d',
    'react',
    'react-dom',
    'react-feather',
    '@vanilla-extract/css',
    '@vanilla-extract/recipes',
    '@vanilla-extract/sprinkles',

    // Everything that starts with "library/"
    // /^library\/.+$/,
  ],
  module: {
    rules: [
      // {
      //   test: /\.png$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         mimetype: 'image/png',
      //         limit: false,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                // ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
                '@babel/preset-typescript',
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  { targets: { node: 16 }, modules: false },
                ],
              ],
              plugins: ['@vanilla-extract/babel-plugin'],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              url: false, // Required as image imports should be handled via JS/TS import statements
            },
          },
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin(), new VanillaExtractPlugin()],
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
};
