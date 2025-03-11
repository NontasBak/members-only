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

async function getAllMessages() {
    const sql = `
        SELECT users.first_name, users.last_name, title, text, date
        FROM messages 
        JOIN users ON messages.user_id = users.id;
    `;

    try {
        const { rows } = await pool.query(sql);
        return rows.map((row) => {
            return {
                ...row,
                date: formatDate(row.date),
            };
        });
    } catch (error) {
        throw error;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

module.exports = {
    createUser,
    updateUserMembership,
    createNewMessage,
    getAllMessages,
};
