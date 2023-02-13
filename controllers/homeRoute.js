const router = require('express').Router();
const sequelize = require('../config/connection');
const { Asteroid } = require('../models');





axios
.get(
  `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&api_key=m3HKKEeMd83xzbasILLhUhnjvaYnkqmbJVmfOMuU`
)
.then((response) => {
  const data = response.data.near_earth_objects;
  data.forEach((element) => {
    Asteroid.create({
      name: element.name,
      diameter: element.estimated_diameter.feet.estmated_diameter_max,
      speed: element.close_approach_data.relative_velocity.miles_per_hour,
      hazardous: element.is_potentially_hazardous_asteroid,
      close_date: element.close_approach_data.close_approach_date_full,
      miss_distance: element.close_approach_data.miss_distance.lunar
    })
  });
  console.log(response);
});
