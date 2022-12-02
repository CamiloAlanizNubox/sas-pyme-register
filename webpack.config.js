const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    new Dotenv({
        path: "./.env",
      }),
    new CopyPlugin({
      patterns: [
        {
            from: "src/",
            to: "./"
        }
      ],
    }),
  ],
};