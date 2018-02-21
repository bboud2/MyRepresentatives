const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const assert = require('assert');
const ProPublicaAPI = require('./ProPublicaAPI');
var constants = require('../common/constants');
var https = require('https');

const url = 'mongodb://localhost:27017';


async function insertAllDocuments() {
    MongoClient.connect(url, async function(err, client) {
    assert.equal(null, err);
    dbName = 'government';
    console.log('successfully connected to mongoDB server: ' + url);

    const db = client.db(dbName);
    try{
      await dropCollection(db, constants.legislature);

      await insertLegislativeMembers(db, constants.senate);
      await insertLegislativeMembers(db, constants.house);
    }
    catch(err) {
      console.log(err);
    } finally {
      console.log('closing database connection');
      client.close();
  }
  })
}

function dropCollection(db, collection) {
  return new Promise(async function(resolve) {
    var collections = await db.collections();
    if(collections.map(c => c.s.name).includes(collection)) {
      await db.collection(collection).drop();
      console.log(`successfully dropped collection: ${collection}`);
    } else {
      console.log(`the collection ${collection} did not previously exist`);
    }
    resolve();
  })
}

function insertLegislativeMembers(db, chamber) {
  return new Promise(resolve => {
    var collection = db.collection(constants.legislature);
    senateMembers = ProPublicaAPI.getAllMembersByChamber(chamber)
      .then(function(promisedMembers) {
        console.log(`Recieved data from ${chamber} api`);
        promisedMembers = generateFullNames(promisedMembers);
        collection.insertMany(promisedMembers, function(err, result) {
          if(err) return console.log(err);
          console.log(`Imported ${chamber} data`);
          resolve(result);
        });
      })
    });
  }

function generateFullNames(members){
  for(var i = 0; i < members.length; i++) {
    members[i]['full_name'] = members[i].first_name + members[i].last_name;
  }
  return members;
}
insertAllDocuments();
