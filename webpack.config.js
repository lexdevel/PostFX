var webpack = require("webpack");

module.exports = {
    "entry": "./source/PostFX",
    "output": {
        "filename": "postfx.bundle.js"
    },
    "resolve": {
        "extensions": [
            ".ts",
            ".js"
        ]
    },
    "module": {
        "rules": [
            {
                "test": /\.ts$/,
                "use": [
                    {
                        "loader": "ts-loader"
                    }
                ]
            }
        ]
    },
    "plugins": [
        new webpack.optimize.UglifyJsPlugin({ "minimize": true })
    ]
};
