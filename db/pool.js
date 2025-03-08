const { Pool } = require("pg");
const dbConfig = require("./config");

const pool = new Pool(dbConfig);

export default pool;