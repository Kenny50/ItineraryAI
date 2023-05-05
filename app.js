const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const constant = require('./src/constant/constant');
const router = require('./src/routes/router');
const logger = require('./src/middleware/logger');

const app = express();

app.use(express.json());

app.use(constant.staticFileDir, express.static('/app/config'));
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['http://itineraryai.com', 'http://localhost']);
    next();
});

app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer().array()); 

app.use('/api/', router);

app.set('port', process.env.PORT || 3020);

const server = app.listen(app.get('port'), () => {
    console.log('Listening on port ' + server.address().port);
})