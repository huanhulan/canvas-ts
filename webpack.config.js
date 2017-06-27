const webpack = require('webpack');
module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/bundle.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    devServer: {
        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,

        // Don't refresh if hot loading fails. If you want
        // refresh behavior, set hot: true instead.
        hotOnly: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // Parse host and port from env to allow customization.
        //
        // If you use Vagrant or Cloud9, set
        // host: options.host || '0.0.0.0';
        //
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.
        host: '0.0.0.0', // Defaults to `localhost`
        port: 3000 // process.env.PORT, Defaults to 8080
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader',
            exclude: /(node_modules)/,
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            exclude: /(node_modules)/
        }, {
            test: /\.tsx?$/,
            loaders: ['awesome-typescript-loader'],
            exclude: /(node_modules)/
        }]
    }

    // Other options...
};