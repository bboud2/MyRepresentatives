var express = require('express');
var fs = require('fs');
var memberController = require('./controller/membercontroller.js');

var app = express();
var port = 3000;
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
  console.log("get request to /");
  res.render("index", {});
})

app.get('/members/senate', function(req, res){
  console.log("get request to: /members/senate");
  members = memberController.getAllMembersByChamber("senate");
  members.then(function(promisedMembers){
    res.render('members/list', {members: promisedMembers});
  }).catch(function(reject){
    console.log(reject);
  });
});

app.get('/members/house', function(req, res){
  console.log("get request to: /members/house");
  members = memberController.getAllMembersByChamber("house");
  members.then(function(promisedMembers){
    res.render('members/list', {members: promisedMembers});
  }).catch(function(reject){
    console.log(reject);
  })
});

app.get('/members/:id', function(req, res){
  console.log("get request to: /members/" + req.params.id);
  member = memberController.getMemberById(req.params.id);
  member.then(function(promisedMember){
    res.render('members/profile', {member: promisedMember})
  }).catch(function(reject){
    console.log(reject);
    res.send("error");
  });
});

app.on('uncaughtException', function(param){
  console.log(param);
})

app.listen(port);
console.log('server has started');
console.log('listening on port: ' + port);
