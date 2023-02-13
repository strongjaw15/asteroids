const { Asteroid } = require('../models');

const asteroidData = [
    {
        name: "Hailey's Comet",
        diameter: 355234,
        speed: 800000,
        hazardous: false,
        close_date: new Date('2023-02-16'),
        miss_distance: 1
    },
    {
        name: "Identified Flying Object",
        diameter: 54542154,
        speed: 1235,
        hazardous: true,
        close_date: new Date('2023-02-20'),
        miss_distance: 55623
    },
    {
        name: "We Be Jammin",
        diameter: 5452,
        speed: 468535446835,
        hazardous: true,
        close_date: new Date('2023-02-13'),
        miss_distance: 5
    },
    {
        name: "Four Twenty",
        diameter: 42069,
        speed: 69420,
        hazardous: false,
        close_date: new Date('2023-04-20'),
        miss_distance: 42666
    },

];

const seedAsteroid = () => Asteroid.bulkCreate(asteroidData);

module.exports = seedAsteroid;
