
//const mysql = require('requireg')('mysql'); //if want global
const mysql = require('mysql'); //use local//

// Set database connection credentials
const config = {
    // host: 'localhost',
    // user: 'root',
    // password: "BeH8aFXocMQE",
    // database: "test"

    host: "den1.mysql2.gear.host",
    user: "apitests",
    password: "Zd9tiDeR-?qB",
    port: 3306,
    database: "apitests"
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;

//NORMAL CONNECTION CONFIG
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "BeH8aFXocMQE",
//   database: "test"
// });

// con.connect(function(err) {
//     if (err) throw err;
// });

// module.exports = con

// module.exports = {
//   con,
//   table
// }
