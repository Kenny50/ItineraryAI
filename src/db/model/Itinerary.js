const { DataTypes } = require('sequelize');
const sequelize = require('../initDB');
const User = require('./User');


const Itinerary = sequelize.define('Itinerary', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // 'Movies' 也可以使用
            key: 'id'
        }
    },
});


module.exports = Itinerary;