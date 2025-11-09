const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0926Omk@r',
  database: 'delta_app',
});

// Inserting New Data
let q = "INSERT INTO userss (id, username, email, password) VALUES ?";

let data = [];
for (let i = 1; i <= 100; i++) {
  data.push([
    i, // Use sequential IDs instead of random to avoid duplicates
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ]);
}

// Use connection promise for better error handling
connection.promise()
  .query(q, [data])
  .then(([results]) => {
    console.log(`Successfully inserted ${results.affectedRows} users`);
    console.log('Insertion results:', results);
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  .finally(() => {
    connection.end();
  });