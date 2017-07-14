"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const likes = Math.floor(Math.random()*(100 - 0)+ 0);
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: new Date().getTime(),
      likes: likes
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post("/:someid/like", function(req, res) {
    let Id = req.params.someid;
    DataHelpers.likeTweet(Id, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
        res.send();
    });
  });

  tweetsRoutes.post("/:someid/unlike", function(req, res) {
    let Id = req.params.someid;
    DataHelpers.unlikeTweet(Id, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
        res.send();
    });
  });

  return tweetsRoutes;

}
