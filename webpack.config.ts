// ----- Imports ----- //

import { fork, ChildProcess } from "child_process";
import webpack, { Compiler, Configuration, Resolve } from "webpack";
import path from "path";
import ManifestPlugin from "webpack-manifest-plugin";
import CleanCSS from "clean-css";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { createHash } from "crypto";
import { renederedItemsAssetsCss } from "./config/rendered-items-assets-styles";
import nodeExternals from "webpack-node-externals";

// ----- Plugins ----- //

class LaunchServerPlugin {
  server?: ChildProcess;
  apply(compiler: Compiler): void {
    compiler.hooks.afterEmit.tap("LaunchServerPlugin", () => {
      console.log("Server starting...");
      this.server = fork("./dist/server.js");
      this.server.on("close", () => console.log("Server stopping..."));
    });

    compiler.hooks.watchRun.tap("LaunchServerPlugin", () => {
      if (this.server) {
        this.server.kill();
      }
    });
  }
}

// ----- Shared Config ----- //

function resolve(loggerName: string): Resolve {
  return {
    extensions: [".ts", ".tsx", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      logger: path.resolve(__dirname, `src/logger/${loggerName}`),
    },
  };
}

// ----- Configs ----- //

const serverConfig = (env: {
  [key: string]: boolean | undefined;
}): Configuration => {
  const isProd = env && env.production;
  const isWatch = env && env.watch;
  // Does not try to require the 'canvas' package,
  // an optional dependency of jsdom that we aren't using.
  const plugins = [new webpack.IgnorePlugin(/^canvas$/)];
  if (isWatch) {
    plugins.push(new LaunchServerPlugin());
  }

  const mode = isProd ? "production" : "development";

  return {
    name: "server",
    mode,
    entry: "server/server.ts",
    target: "node",
    externals: [
      nodeExternals({
        allowlist: [/@guardian/],
      }),
    ],
    node: {
      __dirname: false,
    },
    output: {
      filename: isProd ? "server/server.js" : "server.js",
    },
    watch: env && env.watch,
    watchOptions: {
      ignored: /node_modules/,
    },
    resolve: resolve("server"),
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-react",
                  "@emotion/babel-preset-css-prop",
                ],
              },
            },
            {
              loader: "ts-loader",
              options: { configFile: "config/tsconfig.server.json" },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    devtool: "inline-cheap-source-map",
  };
};

export const clientConfig: Configuration = {
  name: "client",
  mode: "development",
  entry: {
    article: "client/article.ts",
    media: "client/media.ts",
  },
  target: "web",
  devtool: "inline-cheap-source-map",
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    filename: "[name].js",
  },
  plugins: [new ManifestPlugin({ writeToFileEmit: true })],
  resolve: resolve("clientDev"),
  devServer: {
    publicPath: "/assets/",
    proxy: {
      "**": "http://localhost:3040",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                "@emotion/babel-preset-css-prop",
                [
                  "@babel/preset-env",
                  {
                    // Babel recommends installing corejs as a peer dependency
                    // and specifying the version used here
                    // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
                    // This should automatically inject polyfills as needed,
                    // based on our code and the browserslist in package.json
                    useBuiltIns: "usage",
                    corejs: 3,
                    modules: false,
                    targets: { esmodules: true },
                  },
                ],
              ],
            },
          },
          {
            loader: "ts-loader",
            options: { configFile: "config/tsconfig.client.json" },
          },
        ],
      },
    ],
  },
};

const assetsTemplateCss = new CleanCSS()
  .minify(renederedItemsAssetsCss)
  .styles.trim();
const assetHash = (asset: string): string =>
  createHash("sha256").update(asset).digest("base64");

const clientConfigProduction = {
  ...clientConfig,
  name: "clientProduction",
  mode: "production",
  devtool: false,
  plugins: [
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      meta: {
        "Content-Security-Policy": {
          "http-equiv": "Content-Security-Policy",
          content: `style-src 'sha256-${assetHash(assetsTemplateCss)}';`,
        },
      },
      filename: "rendered-items-assets.html",
      template: path.resolve(
        __dirname,
        "config/rendered-items-assets-template.html"
      ),
      minify: true,
      templateParameters: {
        styles: assetsTemplateCss,
      },
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    filename: "[name].[contenthash].js",
  },
  resolve: resolve("clientProd"),
};

// ----- Exports ----- //

export default [serverConfig, clientConfig, clientConfigProduction];
