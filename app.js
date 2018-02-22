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

app.get('/search', function(req, res){
  console.log(`get request to: /search/${req.query.input}`);
  var regexValue = '\.*'+req.query.input+'*\.';
  db.collection(constants.legislature).find({"full_name": {$regex: regexValue, $options: 'i'}}).toArray((err, members) => {
    if(err) return console.log(err)
    console.log(members);
    res.render('search/list', {members: members});
  })
});

app.get('/members/:member_id', function(req, res){
  console.log(`get request to /members/${req.params.member_id}`);
  db.collection(constants.legislature).findOne({id: req.params.member_id}, (err, member) => {
    if(err) console.log(err);
    console.log(member);
    res.render('members/profile', {member: member});
  })
})
