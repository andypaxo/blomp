var express = require('express');
var app = express();

app.use('/', express.static('public'));
app.use('/phaser', express.static('node_modules/phaser-ce/build'));

app.listen(3000, () => { console.log('Listening on port 3000'); });