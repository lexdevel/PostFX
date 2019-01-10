module.exports = {
  "entry": "./src/PostFX",
  "output": {
    "filename": "postfx.bundle.js"
  },
  "resolve": {
    "extensions": [
      ".ts"
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
  }
};
