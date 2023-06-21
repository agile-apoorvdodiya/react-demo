console.log('inside server.js');

const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/build'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/build'));
});

app.listen(process.env.PORT || 8081, () => {
  console.log('server started on port ', process.env.PORT || 8081);
});