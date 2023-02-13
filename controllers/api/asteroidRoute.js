const express = require("express");
const router = express.Router();
const { Asteroid, Comment, User } = require("../../models");
const axios = require("axios");
const moment = require("moment");
const { response } = require("express");
const today = moment().format("YYYY-MM-DD");
const axios = require("axios");
const authenticated = require("../../utils/auth");
const { User, Asteroid, Comment } = require("../../models");


// name, diameter, speed, hazardous, close_date, missed_distance

router.get("/", authenticated, async (req, res) => {});
Asteroid.findOne({
  attributes: ["name", "diameter", "speed", "hazardous", "close_date"],
  where: {
    name: req.params.name,
  },
  include: [
    {
    model: Comment,
    attributes: ["comment_text", "created_at", ],
  },
    {
    model: User,
    attributes: ["username"],
    where: {
      id: Comment.user_id
    }
  }
]
})

