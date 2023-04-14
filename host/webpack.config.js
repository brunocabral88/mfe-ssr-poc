const { UniversalFederationPlugin } = require("@module-federation/node");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const deps = require("./package.json").dependencies;

module.exports = (_, argv) => [
  {
    target: false,
    entry: "./src/index.js",
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      splitChunks: false
    },
    plugins: [
      new UniversalFederationPlugin({
        name: "host",
        library: { type: "commonjs-module" },
        isServer: true,
        remotes: {
          canopy: "canopy@http://localhost:8081/remoteEntry.js",
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
      })
    ],
    module: {
      rules: [{
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    }
  },
  {
    target: "web",
    entry: "./src/client-index.js",
    output: {
      filename: "bundle.js",
    },
    optimization: {
      splitChunks: false
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    plugins: [
      new UniversalFederationPlugin({
        name: "host",
        // library: { type: "var", name: "host" },
        isServer: false,
        remotes: {
          canopy: "canopy@http://localhost:8080/remoteEntry.js",
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
        template: "./src/client-index.html",
        filename: "./client-index.html",
      }),
    ],
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
  }
];
