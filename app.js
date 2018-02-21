var express = require('express');
var fs = require('fs');
var memberController = require('./controller/membercontroller.js');
var MongoClient = require('mongodb').MongoClient;
var constants = require('./common/constants');

var url = "mongodb://localhost:27017/";
var app = express();
var port = 3000;
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

var db

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database.db(constants.government);
  app.listen(port, () => {
    console.log('server has started');
    console.log('listening on port: ' + port);
  })
})

app.get('/', function(req, res){
  console.log("get request to /");
  res.render("index", {});
})

app.get('/members/senate', function(req, res){
  console.log('get request to: /members/senate');
  db.collection(constants.legislature).find({'short_title': 'Sen.'}).toArray((err, members) => {
      if (err) return console.log(err);
      res.render('members/list', {members: members});
  })
});

app.get('/members/house', function(req, res){
  console.log("get request to: /members/house");
  db.collection(constants.legislature).find({'short_title': 'Rep.'}).toArray((err, members) => {
      if (err) return console.log(err);
      res.render('members/list', {members: members});
    });
})

app.get('/members/:id', function(req, res){
  console.log(`get request to: /members/${req.params.id}`);
  var regexValue = '\.*'+req.params.id+'*\.';
  db.collection(constants.senate).find({"full_name": new RegExp(regexValue, 'i')}).toArray((err, members) => {
    if(err) return console.log(err)
  })
});
