const pool = require("./pool");

async function createTables() {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            is_member BOOLEAN DEFAULT FALSE
        );

        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            user_id INTEGER REFERENCES users ( id ),
            title VARCHAR(255),
            text TEXT,
            date DATE
        );
    `;

    try {
        await pool.query(sql);
    } catch (error) {
        throw error;
    }
}

async function main() {
    try {
        await createTables();
    } catch (error) {
        console.log(error);
    }
}

main();
