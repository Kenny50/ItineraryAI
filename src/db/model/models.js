const Rate = require("./Rate");
const StockAnalysisReport = require("./StockAnalysisReport");
const SecuritiesFirms = require('./SecuritiesFirms');
const Industry = require('./Industry');
const Company = require('./Company');

// Rate.hasMany(StockAnalysisReport, { foreignKey: 'rate' });

StockAnalysisReport.belongsTo(Rate, { foreignKey: 'rate' });
StockAnalysisReport.belongsTo(SecuritiesFirms, {foreignKey: 'securitiesFirms'});
StockAnalysisReport.belongsTo(Industry, { foreignKey: 'industry'});
StockAnalysisReport.belongsTo(Company, { foreignKey: 'company'});

module.exports = {
    Rate,
    StockAnalysisReport,
    SecuritiesFirms,
    Industry,
    Company
}