const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Akshu@123',
    database: 'research_db'
});

db.connect(err => {
    if (err) {
        console.log('DB connection failed ❌', err);
    } else {
        console.log('DB connected ✅');
    }
});

module.exports = db;