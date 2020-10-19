const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const patient = require('./controllers/patient');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'omsaid',
      password : '',
      database : 'patient-data'
    }
});

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.listen(5000, () => {console.log("app is running on port 5000")})

app.post('/insert', patient.handleInsert(db))
app.get('/search/:email', patient.handleSearch(db))
app.post('/delete/:email', patient.handleDelete(db))
app.get('/search', patient.handleSearchAll(db))
app.post('/delete', patient.handleDeleteAll(db))
// app.post('/edit/:email', patient.handleEdit(db))