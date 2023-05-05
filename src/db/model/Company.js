const { DataTypes } = require('sequelize');
const sequelize = require('../initDB');
const Industry = require('./Industry');

const Company = sequelize.define('Company',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    industry: {
        type: DataTypes.INTEGER,
        references: {
            model: Industry,
            key: 'id'
        }
    }
})

module.exports = Company;