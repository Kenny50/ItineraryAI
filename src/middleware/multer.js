const multer = require('multer');
const isValidatePdf = require('../usecase/isValidatePdf');
const parseFileName = require('../usecase/parseFileName');
const StockAnalysisReport = require('../db/model/StockAnalysisReport');
const constant = require('../constant/constant');
const dateFormater = require('../usecase/dateFormater');
const Rate = require('../db/model/Rate');
const SecuritiesFirms = require('../db/model/SecuritiesFirms');
const Company = require('../db/model/Company');

// Set storage engine
const storage = multer.diskStorage({
    destination: '/app/config', // specify the destination folder
    filename: async (req, file, cb) => {
        const { stockNumber, securitiesFirms, date, rate } = parseFileName(file.originalname);
        //if validate num, firm, rate, save it to local, then link it to table
        if (isValidatePdf(stockNumber, securitiesFirms, rate)) {
            cb(null, file.originalname); // set the file name to be the same as the original name
            await StockAnalysisReport.create({
                file: file.originalname,
                uploadDate: dateFormater(date),
                rate: (await Rate.findOne({where : {code : rate}})).id,
                industry: (await Company.findOne({where: {code: stockNumber}})).industry,
                securitiesFirms: (await SecuritiesFirms.findOne({where: {code: securitiesFirms}})).id,
                company: (await Company.findOne({where: {code: stockNumber}})).id
            })
        } else {
            // else throw error
            throw new Error('invalidate file name');
        }
    }
});


// Initialize upload
const upload = multer({
    storage: storage
}); // set the field name for the file upload

module.exports = upload;