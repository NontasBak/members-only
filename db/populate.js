const pool = require("./pool");
const db = require("./queries");
const bcrypt = require("bcryptjs");

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
            date TIMESTAMP
        );
    `;

    try {
        await pool.query(sql);
    } catch (error) {
        throw error;
    }
}

async function addSampleUsers() {
    let hashedPassword = await bcrypt.hash("12345678", 10);
    await db.createUser(
        "Alice",
        "Smith",
        "alicesmith@gmail.com",
        hashedPassword
    );
    hashedPassword = await bcrypt.hash("87654321", 10);
    await db.createUser("Bob", "Jones", "bobjones@gmail.com", hashedPassword);
    await db.createNewMessage(
        1,
        "Hello there!",
        "Sup, what an amazing club!!!"
    );
    await db.createNewMessage(2, "Hi", "Hi, there!");
}

async function main() {
    try {
        await createTables();
        await addSampleUsers();
        console.log("Database created successfully");
    } catch (error) {
        console.log(error);
    }
}

main();
