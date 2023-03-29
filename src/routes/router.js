const Router = require('express');
const countryRoute = require('./countryRoute');
const tagRoute = require('./tagRoute');
const aiRoute = require('./aiRoute');
const itineraryRoute = require('./itineraryRoute');
const mailRoute = require('./mailRoute');

const router = Router();

countryRoute(router);
tagRoute(router);
itineraryRoute(router);
aiRoute(router);
mailRoute(router);

module.exports = router;