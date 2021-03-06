const webpack = require("webpack");
const path = require('path');
const TerserJSPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env = {}, opts) => {
    const compilerOptions = require('./tsconfig.json').compilerOptions;
    const alias = {};
    Object.keys(compilerOptions.paths).forEach((item) => {
        const key = item.replace('/*', '');
        const value = path.resolve('./', compilerOptions.paths[item][0].replace('/*', ''));
        alias[key] = value;
    });

    const plugins = [
        new CleanWebpackPlugin([
            './dist'
        ]),
        new CopyWebpackPlugin([
            { from: path.resolve('./', "./resources/html/"), to: __dirname + "/dist/"},
            { from: path.resolve('./', "./resources/css/"), to: __dirname + "/dist/"},
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.HashedModuleIdsPlugin()
    ];
    const webpackConfig = {
        target: 'web',
        mode: env.prod ? 'production' : 'development',
        entry: {
            "Core": "./src/index.ts"
        },
        output: {
            filename: (chunkData) => {
                const pref = () => {
                    switch(chunkData.chunk.name) {
                        case "Core":
                            return "study-core";
                    }
                };
                return pref() + (env.prod ? ".[contenthash].js" : ".js");
            },
            path: __dirname + "/dist",
            publicPath: "/",
            library: "[name]"
        },
        optimization: {
            minimizer: [new TerserJSPlugin({})],
        },
        devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
        resolve: {
            alias: alias,
            extensions: [".ts", ".js"],
            modules: [
                path.resolve(__dirname, "src"),
                "node_modules"
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(ts)?$/,
                    include: [/src/, /node_modules/],
                    loader: "awesome-typescript-loader"
                },
                {
                    enforce: "pre",
                    test: /\.(ts)?$/,
                    use: [{
                        loader: "tslint-loader",
                        options: {
                            formatter: 'stylish',
                            fix: true
                        }
                    }]
                }
            ]
        },
        stats: {
            colors: true
        },
        plugins: plugins
    };

    if (env.prod) {
        plugins.push(
            new CompressionPlugin({
                test: /\.(js|css|json|html|ttf)/,
                filename: "[path].gz[query]",
                algorithm: "gzip",
                threshold: 0,
                minRatio: 0.9,
                deleteOriginalAssets: false
            })
        );
    } else {
        plugins.push(new WriteFilePlugin());
        plugins.push(new BundleAnalyzerPlugin());
        webpackConfig.devServer = {
            port: 12345,
            host: "localhost",
            open: true,
            contentBase: path.resolve(__dirname, "dist"),
            publicPath: "/",
            watchContentBase: true,
            watchOptions: {
                ignored: /node_modules/
            },
            openPage: 'Study.html',
            historyApiFallback: {
                index:'Study.html'
            }
        };
    }
    return webpackConfig;
};
