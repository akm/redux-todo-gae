const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    test: './test/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  devServer: {
    contentBase: path.resolve('dist'),
    publicPath: '/'
  }
};
