const webpack = require("webpack");
const webpackNodeExternals = require('webpack-node-externals')
const path = require("path");

const { VueLoaderPlugin } = require("vue-loader");

const pluginOptions = new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true,
    __INTLIFY_PROD_DEVTOOLS__: true,
  });

const clientConfig = {
    mode: "development",

    entry: "./src/client/client.js",

    output: {
        path: path.resolve(__dirname, "dist/public"),
        publicPath: "/",
        clean: true
    },

    module: {
        rules: [
            // Configure vue-loader
            {
                test: /\.vue$/i,
                exclude: /(node_modules)/,
                use: {
                loader: "vue-loader",
                },
            },
        ]
    },

    plugins: [
        pluginOptions,
        new VueLoaderPlugin(),
    ]
}

const serverConfig = {
    mode: "development",
    
    entry: "./src/server/server.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: 'server.js',
        clean: true
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    externals: [webpackNodeExternals()],

    module: {
        rules: [
        // Configure vue-loader
        {
            test: /\.vue$/i,
            exclude: /(node_modules)/,
            use: {
            loader: "vue-loader",
            },
        },
          {
            // Transpiles ES6-8 into ES5
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
        ]
    },

    plugins: [
        pluginOptions,
        new VueLoaderPlugin(),
    ]
}

module.exports = [clientConfig, serverConfig]