#! /usr/bin/env node

const { Client } = require("pg");

// DROP TABLE IF EXISTS users;
const SQL = `


CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INTEGER,
    bio VARCHAR(200)
);
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://postgres:test123@localhost:5432/top_users",
    // connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users",

  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
