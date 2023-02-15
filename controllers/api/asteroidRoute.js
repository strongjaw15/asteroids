const express = require("express");
const router = express.Router();
const { Asteroid, Comment, User } = require("../../models");

const { response } = require("express");
const axios = require("axios");
const authenticated = require("../../utils/auth");

// name, diameter, speed, hazardous, close_date, missed_distance

router.get("/", authenticated, async (req, res) => {
  Asteroid.findOne({
    attributes: ["name", "diameter", "speed", "hazardous", "close_date"],
    where: {
      name: req.params.name,
    },
    include: [
      {
        model: Comment,
        attributes: ["comment_text", "created_at"],
      },
      {
        model: User,
        attributes: ["username"],
        where: {
          id: Comment.user_id,
        },
      },
    ],
  });
});

router.get("/:id", (req, res) => {
  Asteroid.findOne({
    attributes: ["id", "name", "diameter", "speed", "hazardous", "close_date"],
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,
        include: [
          {
            model: User,
            where: {
              id: Comment.user_id,
            },
          },
        ],
      },
    ],
  }).then((dbAsteroidData) => {
    const asteroid = dbAsteroidData.get({ plain: true });
    res.render("single_asteroid", { asteroid, loggedIn: req.session.loggedIn });
  });
});

module.exports = router;
