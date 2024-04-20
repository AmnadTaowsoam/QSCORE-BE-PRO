// dbConfig.js
const { Pool } = require('pg');
require('dotenv').config();

/**
 * Validates the required environment variables and returns a database configuration.
 * @param {string} prefix The prefix for the environment variables.
 */
function getDbConfig(prefix) {
    const host = process.env['DB_HOST'];
    const user = process.env['DB_USERNAME'];
    const password = process.env['DB_PASSWORD'];
    const database = process.env[`${prefix}_DB_NAME`];
    const port = process.env['DB_PORT'];

    const missingVars = ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', `${prefix}_DB_NAME`, 'DB_PORT']
      .filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(`Database configuration error: Missing environment variables [${missingVars.join(', ')}] for the ${prefix} database.`);
    }

    return { host, user, password, database, port: parseInt(port, 10) };
}

// Create database pools using the configuration helper.
const qscorePool = new Pool(getDbConfig('QSCORE'));
const cassavaPool = new Pool(getDbConfig('CASSAVA'));
const cornPool = new Pool(getDbConfig('CORNS'));
const usersPool = new Pool(getDbConfig('USERS'));
const cornMoistPool = new Pool(getDbConfig('CORNS_MOIST'));

module.exports = { qscorePool, cassavaPool, cornPool, usersPool, cornMoistPool };