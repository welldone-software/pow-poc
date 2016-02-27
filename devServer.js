const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const freeport = require('getport');

const app = express();
const compiler = webpack(config);


app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(hotMiddleware(compiler));

freeport(3000, function(err, port){

  if (err) {
    console.log(err);
    return;
  }

  app.listen(port, 'localhost', function(err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Listening at http://localhost:' + port );
  });

});