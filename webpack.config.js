var webpack = require("webpack");

module.exports = {
    "entry": "./source/PostFX.ts",
    "output": {
        "filename": "postfx.bundle.js"
    },
    "dev-tool": "source-map",
    "resolve": {
        "extensions": [
            "",
            ".webpack.js",
            ".web.js",
            ".ts",
            ".js"
        ]
    },
    "module": {
        "loaders": [
            {
                "test": /\.ts$/,
                "loaders": [ "ts-loader" ],
                "exclude": /node_modules/
            }
        ]
    },
    "plugins": [
        new webpack.optimize.UglifyJsPlugin({ "minimize": true })
    ]
};
