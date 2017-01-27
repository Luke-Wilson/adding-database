var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Sequelize = require('sequelize');

//set up the connection to the existing database
var db = new Sequelize('koala', 'root', 'pw');

//define a model
var Message = db.define('Message', {
  text: Sequelize.STRING
});

db.sync();

var app = express();

// HELPFUL MIDDLEWARE
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('client'));


// ROUTES
app.get('/api/messages', (req, res) => {
  Message.findAll({})
    .then( messages => {
      res.send(messages);
    });
});

app.post('/api/messages', (req, res) => {
  var newMessage = Message.build({text: req.body.text});
  newMessage.save();
  res.send(`message received and saved:  ${req.body.text}`);
});


//Listen to port 3000
app.listen(3002, ()=>{
  console.log('server listening on 3002');
});