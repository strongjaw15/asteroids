const express = require("express");
const router = express.Router();
const { Asteroid, Comment, User } = require("../../models");
const authenticated = require("../../utils/auth");

// Finds all comments

router.get("/", (req, res) => {
  Comment.findAll()
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Creates a new comment

router.post("/", (req, res) => {
  
  Comment.create({
    content: req.body.content,
    user_id: req.session.user_id,
    asteroid_id: req.body.asteroid_id,
  })
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
