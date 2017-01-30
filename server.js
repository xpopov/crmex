const express = require('express');
const app = express();
const historyMiddleware = require('connect-history-api-fallback');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

app.use(historyMiddleware());
app.use(express.static(__dirname));
app.use(devMiddleware(compiler, {
  noInfo: true,
  // inline: true,
  log: true,
  publicPath: config.output.publicPath
  // Fix for the WSL (together with WatchIgnorePlugin)
  /*watchOptions: {
        poll: 500
  }*/
}));
app.use(hotMiddleware(compiler));

app.listen(8080);
