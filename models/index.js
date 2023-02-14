const Asteroid = require('./Asteroid');
const Comment = require('./Comment');
const User = require('./User');

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Asteroid.hasMany(Comment, {
    foreignKey: 'asteroid_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Asteroid, {
    foreignKey: 'asteroid_id',
});

module.exports = {
    Asteroid,
    Comment,
    User
};