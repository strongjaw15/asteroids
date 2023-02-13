const { Asteroid } = require('../models');

const asteroidData = [
    {
        name: "Hailey's Comet",
        diameter: 355234,
        speed: 800000.24,
        hazardous: false,
        close_date: new Date('2023-02-16'),
        miss_distance: 1.5
    },
    {
        name: "Identified Flying Object",
        diameter: 54542154.24,
        speed: 1235.60,
        hazardous: true,
        close_date: new Date('2023-02-20'),
        miss_distance: 55623.20
    },
    {
        name: "We Be Jammin",
        diameter: 5452.19,
        speed: 4685354.19,
        hazardous: true,
        close_date: new Date('2023-02-13'),
        miss_distance: 5.02
    },
    {
        name: "Four Twenty",
        diameter: 42069.15,
        speed: 69420.25,
        hazardous: false,
        close_date: new Date('2023-04-20'),
        miss_distance: 42666.25
    },

];

const seedAsteroid = () => Asteroid.bulkCreate(asteroidData);

module.exports = seedAsteroid;
