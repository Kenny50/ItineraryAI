const { DataTypes } = require('sequelize');
const sequelize = require('../initDB');

const Country = sequelize.define('Country', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  searchTimes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Country;