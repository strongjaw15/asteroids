const router = require("express").Router();
const sequelize = require("../config/connection");
const { Asteroid, Comment, User } = require("../models");
const authenticated = require("../utils/auth");
const axios = require("axios");
const moment = require("moment");
const today = moment().format("YYYY-MM-DD");

const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
const weekAgo = moment().subtract(7, "days").format("YYYY-MM-DD HH:MM:SS");
const Sequelize = require('sequelize')
// destroys asteroids older than 14 hours in the database

router.get("/", async (req, res) => {
   await Asteroid.destroy({ where: {
     createdAt: {
      [Sequelize.lte]: new Date(Date.now() - (60*60*14*1000))
    }
   }});

   // pulls in asteroid data from NASA

  const nasaData = await axios.get(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&api_key=m3HKKEeMd83xzbasILLhUhnjvaYnkqmbJVmfOMuU`
  );

  const data = await nasaData.data.near_earth_objects;
  let promises = [];
  for (const date in data) {

    data[date].forEach(async (element) => {
      correctedName = element.name.replace(/[()]/g, '');

      const awaitme = await promises.push({
          name: correctedName,
          diameter: element.estimated_diameter.feet.estimated_diameter_max,
          speed:
            element.close_approach_data[0].relative_velocity.miles_per_hour,
          hazardous: element.is_potentially_hazardous_asteroid,
          close_date: element.close_approach_data[0].close_approach_date_full,
          miss_distance: element.close_approach_data[0].miss_distance.lunar,

    
        });
   
    });
  }

  //This line bulk creates asteroids, and removes all duplicates.

  Asteroid.bulkCreate(promises, {ignoreDuplicates: true})

  const results = await Asteroid.findAll({});

// This sends the asteroids to the home page and renders them.

  const asteroids = results.map((roidz) => roidz.get({ plain: true }));
 
  res.render("homepage", {
    asteroids: asteroids,
    loggedIn: req.session.loggedIn,
  });
});

//if logged in it will present the single asteroid route with subsequent comments, and the associated users.

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

// If user is logged in it redirects to home page else redirect to login page.

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Takes user to signup route.

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
