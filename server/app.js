var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

//mock database
var database = [
  {text: "hi, this is the first message"},
  {text: "hi, this is the second message"},
];


var app = express();

// HELPFUL MIDDLEWARE
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('client'));


// ROUTES
app.get('/api/messages', (req, res) => {
  res.send(database);
});

app.post('/api/messages', (req, res) => {
  database.push({
    text: req.body.text
  })
  res.send(`message received and saved:  ${req.body.text}`);
});


//Listen to port 3000
app.listen(3000, ()=>{
  console.log('server listening on 3000');
});