const { DataTypes } = require('sequelize');
const sequelize = require('../initDB');

const Rate = sequelize.define('Rate',{
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

// Rate.prototype.getIdByCode(code) = code?(await this.findOne({where: {code: code}})).id:code;

module.exports = Rate;