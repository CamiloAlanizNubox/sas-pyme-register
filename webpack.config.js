const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv({
        path: "./.env",
      }),
    new CopyPlugin({
      patterns: [
        {
            from: "src/assets",
            to: "./assets"
        },
        'src/registro.html',
        'src/register.css'
      ],
    }),
  ],
};