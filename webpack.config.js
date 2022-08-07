const path = require("path");

module.exports = (env) => {
  const isProduction = env.production === true;

  return {
    entry: "./src/app.js",
    output: {
      path: path.join(__dirname, "public"),
      filename: "bundle.js",
    },
    mode: "development",
    module: {
      rules: [
        {
          use: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          use: ["style-loader", "css-loader", "sass-loader"],
          test: /\.s?css$/,
        },
      ],
    },
    devtool: "eval-cheap-module-source-map",
    devServer: {
      static: path.join(__dirname, "public"),
    },
  };
};
