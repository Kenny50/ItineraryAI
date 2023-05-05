const { DataTypes } = require('sequelize');
const sequelize = require('../initDB');

const Industry = sequelize.define('Industry',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    code: {
        type: DataTypes.STRING,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Industry;