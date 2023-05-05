const { DataTypes } = require('sequelize');
const sequelize = require('../initDB');
const Rate = require('./Rate');
const Industry = require('./Industry');
const Company = require('./Company');
const SecuritiesFirms = require('./SecuritiesFirms');

const StockAnalysisReport = sequelize.define('StockAnalysisReport',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uploadDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    rate: {
        type: DataTypes.INTEGER,
        references: {
            model: Rate,
            key: 'id'
        },
        foreignKey: 'rate'
    },
    industry: {
        type: DataTypes.INTEGER,
        references: {
            model: Industry,
            key: 'id'
        },
        foreignKey: 'industry'
    },
    securitiesFirms: {
        type: DataTypes.INTEGER,
        references: {
            model: SecuritiesFirms,
            key:'id'
        },
        foreignKey: 'securitiesFirms'
    },
    company: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id'
        },
        foreignKey: 'company'
    }
})

module.exports = StockAnalysisReport;