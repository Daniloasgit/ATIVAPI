// Importa a biblioteca dotenv para carregar variáveis de ambiente a partir de um arquivo .env
const dotenv = require('dotenv');
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Importa o módulo express para criar o servidor e manipular requisições HTTP
const express = require('express');
// Importa o módulo cors para permitir requisições de diferentes origens (Cross-Origin Resource Sharing)
const cors = require('cors');
// Importa o módulo body-parser para processar o corpo das requisições HTTP
const bodyParser = require('body-parser');

// Importa o módulo de conexão com o banco de dados
const cnct = require('./host/cnct');
// Importa as rotas relacionadas a transações
const TransRotas = require('./rotas/transaction');

// Cria uma instância do aplicativo Express
const app = express();

// Configurações do Express
app.use(cors()); // Habilita o CORS para permitir requisições de outras origens
app.use(bodyParser.json()); // Configura o body-parser para interpretar o corpo das requisições como JSON

// Define as rotas para o recurso de transações
app.use('/api/transactions', TransRotas);

// Rota padrão para verificar se o servidor está ativo
app.get('/', (req, res) => {
    res.send('Servidor ativo com sucesso'); // Responde com uma mensagem de sucesso
});

// Define a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000; // Usa a porta definida na variável de ambiente
