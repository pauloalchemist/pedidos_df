const { Client } = require('pg');
require('../config/configEnv');

const client = new Client({
	connectionString: process.env.DATABASE_URL,
});

client
	.connect()
	.then(() => console.log('DB connected'))
	.catch((err) => console.error('connection DB error', err.stack));

module.exports = {
	query: (text, params) => client.query(text, params),
};
