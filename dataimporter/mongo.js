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
      await db.collection(constants.senate).drop();
      await db.collection(constants.house).drop();

      await insertSenateDocuments(db, constants.senate);
      await insertSenateDocuments(db, constants.house);
    }
    catch(err) {
      console.log(err);
    } finally {
      console.log('closing database connection');
      client.close();
  }
  })
}

async function waitInsert(db, collection) {
  return await insertSenateDocuments(db, collection);
}

function insertSenateDocuments(db, chamber) {
  return new Promise(resolve => {
    var collection = db.collection(chamber);
    senateMembers = ProPublicaAPI.getAllMembersByChamber(chamber)
      .then(function(promisedMembers) {
        console.log("Recieved data from api");
        collection.insertMany(promisedMembers, function(err, result) {
          if(err) return console.log(err);
          console.log(`Imported ${collection} data`);
          resolve(result);
        });
      })
    });
  }
insertAllDocuments();
