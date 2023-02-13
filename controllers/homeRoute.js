const router = require('express').Router();
const sequelize = require('../config/connection');
const { Asteroid } = require('../models');
const authenticated = require('../utils/auth');
const axios = require('axios');
const moment = require("moment");
const today = moment().format("YYYY-MM-DD");







router.get('/', async (req, res) => {
   
  const nasaData = await axios
.get(
  `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&api_key=m3HKKEeMd83xzbasILLhUhnjvaYnkqmbJVmfOMuU`
)

  const data = nasaData.data.near_earth_objects;
  for (const date in data) {
  data[date].forEach( async (element) => {
    await Asteroid.create({
      name: element.name,
      diameter: element.estimated_diameter.feet.estimated_diameter_max,
      speed: element.close_approach_data[0].relative_velocity.miles_per_hour,
      hazardous: element.is_potentially_hazardous_asteroid,
      close_date: element.close_approach_data[0].close_approach_date_full,
      miss_distance: element.close_approach_data[0].miss_distance.lunar
    })
  });
  }
 


    const results = await Asteroid.findAll({
      attributes: ['name', 'miss_distance', 'hazardous'],
    })

      const asteroids = results.map(results.get({ plain: true }));
      res.render('homepage', asteroids)

});
    

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});




module.exports = router;