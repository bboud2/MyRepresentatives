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
        if(verifyProPublicaResponse(senateMembers)) {console.log(senateMembers.errors)};
        senateMembers = senateMembers.results[0].members
        resolve(senateMembers);
      });
    }).on('error', function(e){
      reject(e);
    });
    senateReq.end();
  });
};


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

var verifyProPublicaResponse = function(json) {
    return json.status === "ERROR";
}
