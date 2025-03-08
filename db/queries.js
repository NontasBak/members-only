const pool = require("./pool");

async function createUser(firstName, lastName, email, password) {
    const sql = `
        INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
    `;

    try {
        await pool.query(sql, [firstName, lastName, email, password]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
};
