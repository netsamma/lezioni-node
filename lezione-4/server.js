//**********************************************************************
// Server con Express JS e con accesso a DB Mysql 
//**********************************************************************

// Suggerimenti:
// Bisogna installare i moduli express, body-parser, path, mysql2, dotenv con npm
// Bisogna creare il file .env sull'esempio di .env_example e dare il valore

const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

//Middleware

// app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

// Definizione delle rotte
app.get('/', (req, res) => {
    res.send('<h1>Homepage</h1>');
    console.log(req.body);
});
  
// Configura la connessione al database MySQL
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
      rejectUnauthorized: false,
  },
});

app.get('/get-shops',  (req, res) => {
  conn.query(
    'SELECT * FROM shops',
    (err, result) => {
        if (err) { throw (err); }
        res.json(result);
    }
  )
});

app.get('/db',  (req, res) => {
  conn.query(
    `SELECT TABLE_NAME 
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA='ecommerce';`,
    (err, result) => {
        if (err) { throw (err); }
        res.json(result);
    }
  )
});

app.get('/dbtable', (req,res)=>{
  conn.query(
    `DESCRIBE products;`,
    (err, result) => {
        if (err) { throw (err); }
        res.json(result);
    }
  )
});

// Recupera i prodtti dal DB
app.get('/get-products',  (req, res) => {
  conn.query(
    'SELECT * FROM products',
    (err, result) => {
        if (err) { throw (err); }
        res.json(result);
    }
  )
});

// Recupera i prodtti dal DB
app.get('/get-shops',  (req, res) => {
  conn.query(
    'SELECT * FROM shops',
    (err, result) => {
        if (err) { throw (err); }
        res.json(result);
    }
  )
});

app.get('/create-shops',  (req, res) => {
  conn.query(
    `
    INSERT INTO shops (denominazione, indirizzo) VALUES
      ('Ristorante La Brace', 'Via Roma, 123, Palermo'),
      ('Pizzeria Da Michele', 'Via Vittorio Emanuele, 45, Palermo'),
      ('Trattoria Nonna Maria', 'Via Libertà, 78, Palermo'),
      ('Burger King', 'Via Maqueda, 56, Palermo'),
      ('Ristorante Il Gabbiano', 'Lungomare Cristoforo Colombo, 12, Palermo'),
      ('KFC Palermo', 'Via Notarbartolo, 34, Palermo');
    `,
    (err, result) => {
        if (err) { throw (err); }
        res.json(result);
    }
  )
});



// Aggiunge un negozio al DB
app.post('/submit-shop', (req, res) => {
  console.log(req.body);
  conn.query(
    `
    INSERT INTO shops (denominazione, indirizzo) 
    VALUES (
      '${req.body.denominazione}', 
      '${req.body.indirizzo}'
    )
    `,
    (err, result) => {
        if (err) { throw (err); }
        res.json(result);
    }
  )
});


// Recupera i prodtti dal DB
app.get('/create-shops-table',  (req, res) => {
  conn.query(
    `CREATE TABLE shops (
      id INT AUTO_INCREMENT PRIMARY KEY,
      denominazione VARCHAR(255),
      indirizzo VARCHAR(255)
    );`,
    (err, result) => {
        if (err) { throw (err); }
        res.json(result);
    }
  )
});


// Frontend Server Side Rendering (SSR)
app.get('/form-shop',  (req, res) => {
  res.sendFile(__dirname + '/frontend/public/form.html');
});

app.get('/table-shops',  (req, res) => {
  res.sendFile(__dirname + '/frontend/public/table.html');
});


// Gestione di tutte le altre richieste
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Avvio del server
app.listen(3000, () => {
  console.log(`Server running at http://localhost:${3000}/`)
});