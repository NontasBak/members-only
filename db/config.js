require('dotenv').config();

const localConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}

const dbConfig = localConfig;

module.exports = dbConfig;