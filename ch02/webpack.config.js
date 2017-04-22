const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: '/\.jsx?$/',
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 3355,
    hot: true,
    inline: true
  },
};
