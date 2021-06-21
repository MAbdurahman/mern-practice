const mongoose = require('mongoose');

const connectDatabase = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
         useFindAndModify: false
		});

		console.log(
			`MongoDB connected with mongoose: ${conn.connection.host}`.cyan
		);
	} catch (error) {
		console.error(`Error: ${error.message}`.red);
		process.exit(1);
	}
};

module.exports = connectDatabase;

