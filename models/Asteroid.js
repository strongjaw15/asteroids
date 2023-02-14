const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Asteroid extends Model {}

Asteroid.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        diameter: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        speed: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        hazardous: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        close_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        miss_distance: {
            type: DataTypes.DECIMAL
        },
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'asteroid',
    }
);

module.exports = Asteroid;