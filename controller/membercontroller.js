var fs = require('fs');
var https = require('https');

module.exports.getAllMembersByChamber = function(chamber){
  var opts = getAllMemberOptions(chamber);
  return new Promise(function(resolve, reject){
    var senateMembersText = '';
    var senateReq = https.request(opts, function(res){
      res.setEncoding("UTF-8");
      res.on('data', function(chunk){
        senateMembersText += chunk;
      });
      res.on('end', function(){
        var senateMembers = JSON.parse(senateMembersText);
        senateMembers = senateMembers.results[0].members
        senateMembers = senateMembers.sort(function(a,b){
          return a.state == b.state ? 0 : +(a.state > b.state) || -1;
        });
        resolve(senateMembers);
      });
    }).on('error', function(e){
      reject(e);
    });
    senateReq.end();
  });
};

module.exports.getMemberById = function(memberId){
  var opts = getSpeceficMemberOptions(memberId);
  return new Promise(function(resolve, reject){
    var memberText = '';
    var memberReq = https.request(opts, function(res){
      res.setEncoding("UTF-8");
      res.on('data', function(chunk){
        console.log(chunk);
        memberText += chunk;
      });
      res.on('end', function(){
        var member = JSON.parse(memberText);
        member = member.results[0];
        resolve(member);
      });
    }).on('error', function(e){
      console.log("in error");
      reject(e);
    });
    memberReq.end();
  });
}


var getSpeceficMemberOptions = function(memberId){
  path = `/congress/v1/members/${memberId}.json`;
  return {
    hostname: "api.propublica.org",
    port: 443,
    path: path,
    headers: {
      "X-API-Key": "SELEUqLhWq1jr2FEyn8Y01fABy7G4Lqe0wSiwh9k"
    }
  }
}

var getAllMemberOptions = function(chamber){
  return {
    hostname: "api.propublica.org",
    port: 443,
    path: `/congress/v1/115/${chamber}/members.json`,
    headers: {
      "X-API-Key": "SELEUqLhWq1jr2FEyn8Y01fABy7G4Lqe0wSiwh9k"
    }
  }
}
