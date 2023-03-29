const { DataTypes } = require('sequelize');
const sequelize = require('../initDB');
const Country = require('./Country');

const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CountryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Country, // 'Movies' 也可以使用
      key: 'id'
    }
  }
});


module.exports = City;