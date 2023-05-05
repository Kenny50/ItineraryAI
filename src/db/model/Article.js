const { DataTypes } = require('sequelize');
const sequelize = require('../initDB');
const User = require('./User');

//one or multiple tag
const Article = sequelize.define('Article',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type:DataTypes.TEXT,
        allowNull: false
    },
    publishDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    author:{
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
})

module.exports = Article;