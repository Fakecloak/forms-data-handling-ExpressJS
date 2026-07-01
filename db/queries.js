const pool = require("./pool");

async function getUsers() {
    const { rows } = await pool.query(
        `SELECT
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        age,
        bio
    FROM users
    `
    );

    return rows;
}

async function getUserById(id){
    const {rows} = await pool.query(
          `
        SELECT
            id,
            first_name AS "firstName",
            last_name AS "lastName",
            email,
            age,
            bio
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    return rows[0];
}

async function addUser({firstName, lastName, email, age, bio}) {
    await pool.query(
        `INSERT INTO users(first_name, last_name, email, age, bio) VALUES ($1, $2, $3, $4, $5)`,
        [firstName, lastName, email, age || null, bio || null, ]
    );
}

async function updateUser( id, {firstName, lastName, email, age, bio}) {
    await pool.query(
        `UPDATE users SET first_name = $1, last_name = $2, email = $3, age = $4, bio = $5 WHERE id = $6`,
        [firstName, lastName, email, age || null, bio || null, id]
    );
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
};