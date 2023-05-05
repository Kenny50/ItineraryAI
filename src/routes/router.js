const Router = require('express');
const pdfRoute= require('./pdf/pdfRoute');
const companyRoute = require('./company/companyRoute');
const industryRoute = require('./insudtry/industryRoute');
const rateRoute = require('./rate/rateRoute');
const firmsRoute = require('./securitiesFirms/firmsRoute');

const router = Router();
pdfRoute(router);
companyRoute(router);
industryRoute(router);
rateRoute(router);
firmsRoute(router);

module.exports = router;