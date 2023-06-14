const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'admin_jobleap',
  password: '123',
  database: 'job_database',
  port: 3306,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

app.get('/getData', (req, res) => {
  let sql = 'SELECT * FROM jobs';
  db.query(sql, (err, results) => {
    if (err) throw err;
    const formattedResults = results.map((result) => {
      const date = new Date(result.date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return { ...result, date: formattedDate };
    });
    res.send(formattedResults);
  });
});

app.post('/signup', (req, res) => {
    const { firstName, lastName, email, job_id } = req.body;
    let sql = `INSERT INTO people (first_name, last_name, email) VALUES ('${firstName}', '${lastName}', '${email}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      const personId = result.insertId;
      let sql2 = `INSERT INTO applications (job_id, person_id) VALUES (${job_id}, ${personId})`;
      db.query(sql2, (err, result) => {
        if (err) throw err;
        res.send({ message: 'Utilisateur crée avec succèe' });
      });
    });
  });

app.get('/getApplications', (req, res) => {
  let sql = `SELECT applications.application_id, jobs.job_id, people.last_name, people.first_name, jobs.title, jobs.description, jobs.company, people.person_id 
  FROM applications 
  JOIN jobs ON applications.job_id = jobs.job_id 
  JOIN people ON applications.person_id = people.person_id;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
