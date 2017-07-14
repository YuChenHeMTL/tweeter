"use strict";

const userHelper    = require("../lib/util/user-helper")
const methodOverride = require("method-override")
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(newDataHelpers) {


  tweetsRoutes.post("/tweets/like", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    const id = req.body.text
    newDataHelpers.likeTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });

  })

  return tweetsRoutes;

}
