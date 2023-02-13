const { User } = require('../models');

const userData = [
    {
        username: 'sailor_moon',
        password: 'password'
    },
    {
        username: 'roidbaby765',
        password: 'password'
    },
    {
        username: 'gary',
        password: 'password'
    },
    {
        username: 'blazedAF',
        password: 'password'
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;