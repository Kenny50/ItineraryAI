const { DataTypes } = require('sequelize');
const sequelize = require('../initDB');

const Tag = sequelize.define('Tag',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
})      

module.exports = Tag;