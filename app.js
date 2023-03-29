const express = require('express');
const router = require('./src/routes/router');
const bodyParser = require('body-parser')
const sequelize = require('./src/db/initDB');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use('/', router);

app.set('port', process.env.PORT || 3020);

// sequelize.sync().then(() => {
	const server = app.listen(app.get('port'), () => {
		console.log('Listening on port ' + server.address().port);
	})

// }).catch(err => {
//     console.error('Unable to connect to the database:', err);
// });