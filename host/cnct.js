// Importa o módulo mysql2 para trabalhar com MySQL
const mysql = require('mysql2');

// Configuração da conexão com o banco de dados MySQL
const cnct = mysql.createConnection({
    host: process.env.DB_HOST,     // Endereço do host do banco de dados (recuperado de uma variável de ambiente)
    user: process.env.DB_USER,     // Nome de usuário para autenticação (recuperado de uma variável de ambiente)
    password: process.env.DB_PASS, // Senha para autenticação (recuperada de uma variável de ambiente)
    database: process.env.DB_NAME  // Nome do banco de dados a ser usado (recuperado de uma variável de ambiente)
});

// Estabelece a conexão com o banco de dados
cnct.connect((err) => {
    if (err) {
        // Se houver um erro ao conectar, exibe uma mensagem de erro no console
        console.error('Erro ao se conectar ao banco de dados:', err);
        return;
    }
    // Se a conexão for bem-sucedida, exibe uma mensagem de boas-vindas com o nome do banco de dados
    console.log(`Conectado ao banco de dados, bem-vindo: ${process.env.DB_NAME}`);
});

// Exporta a conexão para que possa ser utilizada em outros módulos
module.exports = cnct;
