const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

// PathLocationStrategy, that allows Angular to handle routing instead of the server
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/luxuryvoyage/index.html'));
});
