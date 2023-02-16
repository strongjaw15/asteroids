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

router.get("/", async (req, res) => {
   await Asteroid.destroy({ where: {
     createdAt: {
      [Sequelize.lte]: new Date(Date.now() - (60*60*14*1000))
    }
   }});

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


  Asteroid.bulkCreate(promises, {ignoreDuplicates: true})

  const results = await Asteroid.findAll({});
  // console.log("results: ", results);

  const asteroids = results.map((roidz) => roidz.get({ plain: true }));
  // console.log(asteroids);
  res.render("homepage", {
    asteroids: asteroids,
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
    console.log(singleConvert);
    res.render("single_asteroid", {
      asteroid: singleConvert,
      loggedIn: req.session.loggedIn,
    });
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
