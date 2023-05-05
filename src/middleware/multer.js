const multer = require('multer');
const isValidatePdf = require('../usecase/isValidatePdf');
const parseFileName = require('../usecase/parseFileName');
const StockAnalysisReport = require('../db/model/StockAnalysisReport');
const constant = require('../constant/constant');
const dateFormater = require('../usecase/dateFormater');
const Rate = require('../db/model/Rate');
const SecuritiesFirms = require('../db/model/SecuritiesFirms');
const Company = require('../db/model/Company');
const { v4: uuidv4 } = require('uuid');


// Initialize upload
const upload = multer({
    storage: storage
}); // set the field name for the file upload

module.exports = upload;