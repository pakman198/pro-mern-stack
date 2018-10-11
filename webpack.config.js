const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    // the key will be the file name.
    // if entry is a string instead of an object, the name by default is main
    app: ['./src/App.js'],
  },
  output: {
    path: path.resolve(__dirname, './static'),
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|prop-types|whatwg-fetch|react-router-dom|react-bootstrap|react-router-bootstrap)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    port: 8000,
    publicPath: '/',
    historyApiFallback: true,
    contentBase: 'static',
    hot: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
      },
    },
  },
  devtool: 'source-map',
  plugins: [],
};
