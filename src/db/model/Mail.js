const { DataTypes } = require('sequelize');
const sequelize = require('../initDB');

const Mail = sequelize.define('Mail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports= Mail;