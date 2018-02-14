var https = require('https');
var fs = require('fs');

var senateOpt = {
  hostname: "api.propublica.org",
  port: 443,
  path: '/congress/v1/115/senate/members.json',
  headers: {
    "X-API-Key": "SELEUqLhWq1jr2FEyn8Y01fABy7G4Lqe0wSiwh9k"
  }
}

var houseOpt = {
  hostname: "api.propublica.org",
  port: 443,
  path: '/congress/v1/115/house/members.json',
  headers: {
    "X-API-Key": "SELEUqLhWq1jr2FEyn8Y01fABy7G4Lqe0wSiwh9k"
  }
}

var senateReq = https.request(senateOpt, function(res) {
  writeStream = fs.createWriteStream("senateMembers.json");
  res.setEncoding("UTF-8");
  console.log("writing the member data to: " + writeStream.path);
  res.pipe(writeStream);
});

senateReq.on('error', function(err){
  console.log(`a problem occurd ${err.message}`);
});

senateReq.end();

var houseReq = https.request(houseOpt, function(res) {
  writeStream = fs.createWriteStream("houseMembers.json");
  res.setEncoding("UTF-8");
  console.log("writing the member data to: " + writeStream.path);
  res.pipe(writeStream);
});

houseReq.on('error', function(err){
  console.log(`a problem occurd ${err.message}`);
});

houseReq.end();
