const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',      // Host do MySQL (normalmente "localhost")
  user: 'root',           // Seu usuário MySQL
  password: 'Duda1879@',  // 
  database: 'rhAC1'       // O nome do banco de dados que você criou
});

module.exports = pool.promise();
