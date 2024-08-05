const mysql = require('mysql2');

// conecção com o mysql
const cnct = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// uso das databases
cnct.connect((err) => {
    if (err) {
        console.error('Erro ao se conectar ao banco de dados:', err);
        return;
    }
    console.log(`Conectado ao banco de dados, bem-vindo: ${process.env.DB_NAME}`);
});

module.exports = cnct;
