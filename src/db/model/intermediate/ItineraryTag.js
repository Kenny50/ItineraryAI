const { DataTypes } = require('sequelize');
const sequelize = require('../../initDB');
const Itinerary = require('../Itinerary');
const Tag = require('../Tag');

// Define the join table ItineraryTag
const ItineraryTag = sequelize.define('ItineraryTag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ItineraryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Itinerary,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    TagId: {
        type: DataTypes.INTEGER,
        references: {
            model: Tag,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
});

module.exports = ItineraryTag;
