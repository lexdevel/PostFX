module.exports = {
  "entry": "./src/PostFX",
  "mode": "production",
  "output": {
    "filename": "postfx.bundle.js"
  },
  "devServer": {
    "hot": false,
    "client": false
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
