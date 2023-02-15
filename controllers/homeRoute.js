const router = require("express").Router();
const sequelize = require("../config/connection");
const { Asteroid, Comment, User } = require("../models");
const authenticated = require("../utils/auth");
const axios = require("axios");
const moment = require("moment");
const Sequelize = require('sequelize')

const today = moment().format("YYYY-MM-DD");
const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
const weekAgo = moment().subtract(7, "days").format("YYYY-MM-DD HH:MM:SS");

router.get("/", async (req, res) => {
  // This wipes out old asteroids.
  await Asteroid.destroy({ where: {
    created_at: {
      [Sequelize.Op.lt]: weekAgo
    }
  }});

  // This makes the API call to NASA.
  const nasaData = await axios.get(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${tomorrow}&api_key=m3HKKEeMd83xzbasILLhUhnjvaYnkqmbJVmfOMuU`
  );

  // This creates the asteroids in the db.
  const data = await nasaData.data.near_earth_objects;
  const promises = [];
  for (const date in data) {
    data[date].forEach(async (element) => {
      
      promises.push(
        Asteroid.create({
          name: element.name,
          diameter: element.estimated_diameter.feet.estimated_diameter_max,
          speed: element.close_approach_data[0].relative_velocity.miles_per_hour,
          hazardous: element.is_potentially_hazardous_asteroid,
          close_date: element.close_approach_data[0].close_approach_date_full,
          miss_distance: element.close_approach_data[0].miss_distance.lunar,
        })
      );
    });
  }

  await Promise.all(promises);

  // This gets all the asteroids.
  const results = await Asteroid.findAll({});
  // console.log("results: ", results);

  // This sends all the asteroids to the homepage view.
  const asteroids = results.map((roidz) => roidz.get({ plain: true }));
  // console.log(asteroids);
  res.render("homepage", {
    asteroids: asteroids,
    loggedIn: req.session.loggedIn
  });
});


router.get("/asteroid/:id", authenticated, (req, res) => {

  Asteroid.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,
        include: {
          model: User,
        },
      },
    ],
  }).then((convert) => {
    const singleConvert = convert.get({ plain: true });
    res.render("single_asteroid", {
      asteroid: singleConvert,
      loggedIn: req.session.loggedIn,
    });
  });
});

// This renders the login page.
router.get("/login", (req, res) => {
  res.render("login");
});

// This renders the signup page.
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
