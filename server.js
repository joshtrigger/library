const express = require('express');
const app = express();
const forceSSL = () => {
  return function(req, res, next) {
    if (req.headers['x-forward-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  };
};
const path = require('path');

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/library/index.html'));
});

app.use(forceSSL());

app.use(express.static(__dirname + '/dist/library'));

app.listen(process.env.PORT || 5000);
