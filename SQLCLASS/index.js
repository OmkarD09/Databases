const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 8080;
const ejs = require('ejs');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0926Omk@r',
  database: 'delta_app',
});

// Inserting New Data
// let q = "INSERT INTO userss (id, username, email, password) VALUES ?";

// let data = [];
// for (let i = 1; i <= 100; i++) {
//   data.push([
//     i, // Use sequential IDs instead of random to avoid duplicates
//     faker.internet.username(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ]);
// }

// Use connection promise for better error handling

//Home Route
  app.get('/', (req, res) => {
    let q = 'SELECT count(*) FROM userss';
  try {
  connection.query(q, (err, results) => {
    if (err) throw err;
      console.log('Inserted user:', results);
    res.render("home.ejs", {count: results[0]['count(*)']  } );
  });
} catch (error) {
  console.error('Error:', error);
}

  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

app.get('/users', (req, res) => {
    let q = 'SELECT * FROM userss';
  try {
  connection.query(q, (err, results) => {
    if (err) throw err;
    res.render("showUsers.ejs", { users: results });
  });
} catch (error) {
  console.error('Error:', error);
}

  });

  app.get('/users/:id/edit', (req, res) => {
    const userId = req.params.id;
    let q = 'SELECT * FROM userss WHERE id = ?';
    try {
      connection.query(q, [userId], (err, results) => {
        if (err) throw err;
        res.render("editUser.ejs", { user: results[0] });
      });
    } catch (error) {
      console.error('Error:', error);
    }
  });

  app.patch('/users/:id', (req, res) => {
    const {id} = req.params;
    const {username : newUsername, password : formPassword} = req.body;
    let q = `SELECT * FROM userss WHERE id = ?`;
    try {
      connection.query(q, [id], (err, results) => {
        if (err) throw err;
        if(formPassword !== results[0].password){
        res.send("Password Incorrect! Cannot update username.");
        }
        else{
        let q2 = 'UPDATE userss SET username = ? WHERE id = ?';
        connection.query(q2, [newUsername, id], (err, results) => {
          if (err) throw err;
          res.redirect(`/users`);
        });
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  });

  app.get('/users/new', (req, res) => {
    res.render("newUser.ejs");
  });

  app.post('/users', (req, res) => {
    const { username, email, password } = req.body; 
    let q = 'INSERT INTO userss (username, email, password) VALUES (?, ?, ?)';
    try {
      connection.query(q, [username, email, password], (err, results) => {
        if (err) throw err;
        res.redirect(`/users`);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  });

  app.get('/users/:id/delete', (req, res) => {
    const userId = req.params.id;
    let q = 'SELECT * FROM userss WHERE id = ?';
    try {
      connection.query(q, [userId], (err, results) => {
        if (err) throw err;
        res.render("deleteUser.ejs", { user: results[0] });
      });
    } catch (error) {
      console.error('Error:', error);
    }
  });


  app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    const {email, password} = req.body;
    let q = `SELECT * FROM userss WHERE id = ?`;
    try {
      connection.query(q, [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
          return res.status(404).send('User not found');
        }
        const user = results[0];
        if (user.email !== email || user.password !== password) {
          return res.status(403).send('Forbidden');
        }
        q = `DELETE FROM userss WHERE id = ?`;
        connection.query(q, [id], (err, results) => {
          if (err) throw err;
          res.redirect(`/users`);
        });
      });
    } catch (error) {
      console.error('Error:', error);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });