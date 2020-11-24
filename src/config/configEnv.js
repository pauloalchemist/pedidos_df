const { config } = require('dotenv');
const { ok } = require('assert');
const { join } = require('path');

const env = process.env.NODE_ENV || 'dev';
ok(env === 'prod' || env === 'dev', 'A env é invalida. Deve ser dev ou prod.');

const configPath = join(__dirname, '../../', `.env.${env}`);

config({
	path: configPath,
});

module.exports = config;
