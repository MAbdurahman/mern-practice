//**************** imports ****************//
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDatabase = require('./config/databaseConfig')

const userRoutes = require('./routes/userRoutes')


//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;


//**************** configuration setup ****************//
dotenv.config();
colors.enable();
connectDatabase();
//**************** middleware****************//
if (process.env.NODE_ENV === 'DEVELOPMENT') {
	app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/v1.0/users', userRoutes);

//**************** routes****************//
app.get('/', (req, res) => {
	res.send('API is at Home');
});








//**************** app listening ****************//
const server = app.listen(PORT, () => {
	console.log(
		`The server is listening at - http://127.0.0.1:${PORT} in ${NODE_ENV} mode🔥`
			.yellow
	);
});