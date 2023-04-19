const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    mode: "development",

    output: {
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
            // Configure babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_I18N_FULL_INSTALL__: true,
            __VUE_I18N_LEGACY_API__: true,
            __INTLIFY_PROD_DEVTOOLS__: true,
        }),
        new VueLoaderPlugin(),
    ]
}