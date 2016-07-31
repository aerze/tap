var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: path.join(__dirname, "/src/main.js"),

  output: {
      path: path.join(__dirname, "/dist/js"),
      filename: "bundle.js"
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]
};

