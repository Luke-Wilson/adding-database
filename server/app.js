var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');


//Set address and open connection to database
mongoose.connect('mongodb://localhost/adddatabase');

//See if our pending connection (mongoose.connection) was successful or not
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected');
});

//create schema
var messageSchema = mongoose.Schema({
  text: String
});

//compile this schema into a MODEL
var Message = mongoose.model('Message', messageSchema);


var app = express();

// HELPFUL MIDDLEWARE
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('client'));


// ROUTES
app.get('/api/messages', (req, res) => {
  Message.find({})
  .then(resp => {
    console.log(resp);
    res.send(resp)
  })
});

app.post('/api/messages', (req, res) => {
  var newMessage = new Message({text: req.body.text})
  newMessage.save();
  res.send(`message received and saved:  ${req.body.text}`);
});


//Listen to port 3000
app.listen(3000, ()=>{
  console.log('server listening on 3000');
});