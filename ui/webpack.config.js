const path = require('path');

const distFiles = ['main.bundle.js'];

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
    publicPath: '/',
    before: function(app){
      app.get('/*', function(req, res) {
        reqFile = req.path.slice(1)
        file = distFiles.includes(reqFile) ? reqFile : "index.html"
        res.sendFile(path.resolve(__dirname, 'dist/' + file));
      });
    }
  }
};
