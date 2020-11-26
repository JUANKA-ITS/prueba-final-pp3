const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tp_final'
});

db.connect();
console.log("la conexion ha sido un exito");
module.exports = db;