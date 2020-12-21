const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = () => {
  const isEnvDevelopment = process.env.NODE_ENV === "development";
  const isEnvProduction = process.env.NODE_ENV === "production";

  return {
    mode: isEnvDevelopment ? "development" : "production",
    devtool: isEnvDevelopment ? "inline-source-map" : "hidden-source-map",
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
      modules: [path.join(__dirname, "src"), "node_modules"],
      alias: {
        "@components": path.resolve(__dirname, "src", "components"),
        "@hooks": path.resolve(__dirname, "src", "hooks"),
        "@pages": path.resolve(__dirname, "src", "pages"),
        "@static": path.resolve(__dirname, "src", "static"),
        "@utils": path.resolve(__dirname, "src", "utils"),
      },
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, "dist"), // 서버가 로딩할 static 파일 경로 지정
      stats: "errors-warnings",
      overlay: true,
    },
    entry: path.join(__dirname, "src", "index"),
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          exclude: path.join(__dirname, "node_modules"),
        },
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: !isEnvDevelopment,
            },
          },
          exclude: path.join(__dirname, "node_modules"),
        },
        {
          loader: "url-loader",
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          options: {
            limit: 10000,
            outputPath: "static/", // 파일이 저장될 시스템 경로 지정
            name: "[name].[hash:8].[ext]",
          },
        },
        {
          loader: "file-loader",
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          options: {
            outputPath: "static/", // 파일이 저장될 시스템 경로 지정
            name: "[name].[hash:8].[ext]",
          },
        },
      ],
    },
    plugins: [
      isEnvDevelopment && new ReactRefreshWebpackPlugin(),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new BundleAnalyzerPlugin({ analyzerMode: "server", openAnalyzer: false }),
      isEnvProduction && new BundleAnalyzerPlugin({ analyzerMode: "static" }),
      isEnvProduction && new webpack.LoaderOptionsPlugin({ minimize: true }),
      new webpack.EnvironmentPlugin({ NODE_ENV: isEnvDevelopment ? "development" : "production" }),
      new HtmlWebpackPlugin({
        inject: "body",
        template: path.join(__dirname, "public", "/index.html"),
      }),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: "./src/**/*.{ts,tsx,js,jsx}",
        },
      }),
    ].filter(Boolean),
    output: {
      path: path.join(__dirname, "dist"), // 번들링 한 결과를 보관 할 디렉터리 위치
      filename: "[name].[hash:8].js",
      publicPath: "/dist/", // 모든 파일의 접두사
    },
  };
};
