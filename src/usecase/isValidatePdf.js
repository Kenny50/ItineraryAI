const Company = require('../db/model/Company');
const SecuritiesFirms = require('../db/model/SecuritiesFirms');
const Rate = require('../db/model/Rate');

function isValidatePdf(stockNumber, securitiesFirms, rate){
    const company = Company.findOne({
        where: {
            code: stockNumber
        }
    })
    const firms = SecuritiesFirms.findOne({
        where: {
            code: securitiesFirms
        }
    })
    const rates = Rate.findOne({
        where: {
            code: rate
        }
    })
    return company && firms && rates
}

module.exports = isValidatePdf;