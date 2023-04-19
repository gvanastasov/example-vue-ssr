const base = require("./webpack.config.base.js");
const { merge } = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals')
const path = require("path");

const clientConfig = {
    entry: "./src/client/client.js",
    output: {
        path: path.resolve(__dirname, "../dist/public"),
        filename: 'client.js',
    },
}

const serverConfig = {
    mode: "development",
    entry: "./src/server/server.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: 'server.js',
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [webpackNodeExternals()],
}

module.exports = [clientConfig, serverConfig].map(x => merge(base, x))