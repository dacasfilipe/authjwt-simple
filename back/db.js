const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'autentication'
});

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, params, (err, results) => {
          connection.release();
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

module.exports = {
  query,
  hashPassword
};