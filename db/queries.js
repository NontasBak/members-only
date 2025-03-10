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

async function updateUserMembership(userId) {
    const sql = `
        UPDATE users
        SET is_member = TRUE
        WHERE id = $1
    `;

    try {
        await pool.query(sql, [userId]);
    } catch (error) {
        throw error;
    }
}

async function createNewMessage(userId, title, text) {
    const sql = `
        INSERT INTO messages (user_id, title, text, date)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
    `;

    try {
        await pool.query(sql, [userId, title, text]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    updateUserMembership,
    createNewMessage,
};
