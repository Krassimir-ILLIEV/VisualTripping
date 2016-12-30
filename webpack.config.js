// webpack.config.js
var path = require("path");
module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, "view"),
        filename: 'build.js'
    },
    module: {
        loaders: [
            { test: /\.node$/, loader: "node-loader" }
        ]
    },
    resolve: {
        extensions: ["", ".json", ".node", ".js"]
    },
    node: {
        net: "empty",
        tls: "empty",
    },
    target: "node" // <---------- ADD THIS
}