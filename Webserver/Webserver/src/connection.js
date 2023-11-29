const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'db_desafio',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados Mysql');
  });

module.exports = connection;