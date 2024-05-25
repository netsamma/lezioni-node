//**********************************************************************
// Server con Express JS e con accesso a DB Mysql 
//**********************************************************************

// Suggerimenti:
// Bisogna installare i moduli express, body-parser, path, mysql2, dotenv con npm
// Bisogna creare il file .env sull'esempio di .env.prod e dare il valore

const express = require('express');
// var bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const mysql2 = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();


//Middleware
// app.use( bodyParser.json() );
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

// Configura la connessione al database MySQL con mysql/promise
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
      rejectUnauthorized: false,
  },
});

// Configura la connessione al database MySQL con mysql
const conn = mysql2.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
      rejectUnauthorized: false,
  },
});




/************************************************
*
* Routes, applicazione BE e FE
*
*************************************************/




// Home page
app.get('/', (req, res) => {
    res.send('<h1>Homepage</h1>');
    console.log(req.body);
});


// **********************************************************************
// Query per la ricerca, creazione, modifica, cancellazione dei record
// **********************************************************************

// // Recupera gli shops dal DB con mysql
// app.get('/get-shops',  (req, res) => {
//   conn.query(
//     'SELECT * FROM shops',
//     (err, result) => {
//         if (err) { throw (err); }
//         res.json(result);
//     }
//   )
// });

async function query(...arguments){
  try{
    const connection = await pool.getConnection()
    const [rows] = await connection.query(...arguments)
    connection.release()
    return rows
  } catch (error) {
    return error
  }
}

// Recupera gli shops dal DB con mysql/promise
app.get('/get-shops', async (req, res) => {
  res.json(await query('SELECT * FROM shops'))
});


// Recupera i prodotti dal DB
app.get('/get-products', async (req, res) => {
  res.json(await query('SELECT * FROM products'))
});


// Aggiunge o modifica uno shop dal DB
app.post('/save-shop', async (req, res) => {
  console.log(req.body);
  const conn = await pool.getConnection();
  // Se ho passato l'id dalla tabella iniziale sono in modifica
  if (req.body.id){
    sql = `
    UPDATE shops 
    SET 
      denominazione = '${req.body.denominazione}', 
      indirizzo = '${req.body.indirizzo}'
    WHERE 
      id = ${req.body.id}
    `
    console.log(sql);
  }else{
  // Altrimenti sono in inserimento
    sql = `
    INSERT INTO shops (denominazione, indirizzo) 
    VALUES (
      '${req.body.denominazione}', 
      '${req.body.indirizzo}'
    )
    `
  }
  const [result] = await conn.query(sql);
  res.send(result);
});


// Modifica uno shop nel DB versione di DARIO
app.post('/update-shop', async (req, res) => {
  const { id, indirizzo, denominazione } = req.body;
  const sql = `
    UPDATE 
      shops 
    SET 
      denominazione = '${denominazione}', 
      indirizzo = '${indirizzo}'
    WHERE 
      id = ${id};
  `
  res.json(await query(sql))
})


// Cancella uno shop
app.get('/delete/:id', async (req, res) => {
  const sql = `DELETE FROM shops WHERE id = ${req.params.id}`
  console.log(sql);
  res.json(await query(sql))
})


// Modifica uno shop nel DB versione di DARIO con prepared statement
app.post('/update-shop-2', (req, res) => {
  const { id, name, indirizzo } = req.body;
  const sql = 'UPDATE shops SET denominazione = ?, indirizzo = ? WHERE id = ?';
  conn.query(sql, [name, indirizzo, id], (err, result) => {
    if (err) {
      throw (err)
      // console.error('Error updating data:', err);
      // res.status(500).send('Internal Server Error');
    } else {
      // console.log('Data updated successfully');
      // res.status(200).send('Data updated successfully');
      res.json(result);
    }
  });
});


// form.html POSTs
// ----------------------

async function common_form_processing(request, response, sql){
  const { id, denominazione, indirizzo } = request.body
  query(sql, [denominazione, indirizzo, id])
  response.redirect("/table-shops")
}

app.post("/table-shops", async function (request, response){
  common_form_processing(request, response, 
    'UPDATE shops SET denominazione = ?, indirizzo = ? WHERE id = ?')
})

app.post("/form-shop", async function (request, response){
  common_form_processing(request, response, 
    'INSERT INTO shops (denominazione, indirizzo) VALUES (?,?)')
})


// *************************************************************
// Query per la creazione e l'interrogazione di tabelle del DB
// *************************************************************

// Crea la tabella shops nel DB
app.get('/create-shops-table', async (req, res) => {
 
  const sql=`CREATE TABLE shops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    denominazione VARCHAR(255),
    indirizzo VARCHAR(255)
  );`
  res.json(await query(sql))

  if(false)
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

// Inserisce 6 record di ESEMPIO nella tabella shops del DB
app.get('/create-shops', async (req, res) => {

  const sql =     `
  INSERT INTO shops (denominazione, indirizzo) VALUES
    ('Ristorante La Brace', 'Via Roma, 123, Palermo'),
    ('Pizzeria Da Michele', 'Via Vittorio Emanuele, 45, Palermo'),
    ('Trattoria Nonna Maria', 'Via Libertà, 78, Palermo'),
    ('Burger King', 'Via Maqueda, 56, Palermo'),
    ('Ristorante Il Gabbiano', 'Lungomare Cristoforo Colombo, 12, Palermo'),
    ('KFC Palermo', 'Via Notarbartolo, 34, Palermo');
  `
  res.json(await query(sql))
  
  if(false)
  conn.query(
  sql,
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

app.get('/db1',  async (req, res) => {
  const [row] = await pool.query(
    `SELECT TABLE_NAME 
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA='ecommerce';`
  );
  res.send(row);
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


// ***************************************************************
// Frontend API Server Side Rendering (SSR) e Static files
// ***************************************************************

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
