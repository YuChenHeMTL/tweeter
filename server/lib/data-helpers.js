"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const ObjectID = require("mongodb").ObjectID;
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
      // });
    },

    likeTweet: function (objID, callback){
      let objectString = "ObjectId(" + objID + ")";
      db.collection("tweets").update({"_id": ObjectID(objID)},{$inc :{likes: 1}}, callback);
    },

    unlikeTweet: function (objID, callback){
      let objectString = "ObjectId(" + objID + ")";
      db.collection("tweets").update({"_id": ObjectID(objID)},{$inc :{likes: -1}}, callback);
    },

    getTweets: function (callback) {
      db.collection("tweets").find().sort({created_at: 1}).toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    }

  };
}
