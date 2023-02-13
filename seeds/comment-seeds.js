const { Comment } = require('../models');

const commentData = [
    {
        content: "Best asteroid ever!",
        user_id: 1,
        asteroid_id: 1,
    },
    {
        content: "This asteroid is hot AF",
        user_id: 2,
        asteroid_id: 2,
    },
    {
        content: "This asteroid ruined my relationship!",
        user_id: 3,
        asteroid_id: 3,
    },
    {
        content: "This one has a strange green hue",
        user_id: 4,
        asteroid_id: 4,
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;