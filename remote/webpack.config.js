const HtmlWebPackPlugin = require("html-webpack-plugin");
const { UniversalFederationPlugin } = require('@module-federation/node');

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => {
  console.log({ argv });

  const isServer = argv.env['server-build'] === "true";

  return {
    target: isServer ? false : 'web',
    output: {
      publicPath: "http://localhost:8080/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: !isServer ? 8080 : 8081,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new UniversalFederationPlugin({
        name: "canopy",
        library: isServer ? { type: "commonjs-module" } : { type: "var", name: "canopy" },
        isServer,
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./Button": "./src/Button",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  }
};
