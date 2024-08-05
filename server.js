// biblioteca
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// rotas,databases
const cnct = require('./host/cnct'); 
const TransRotas = require('./rotas/transaction');

const app = express();

// Configurações Express
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/transactions', TransRotas);

app.get('/', (req, res) => {
    res.send('Servidor ativo com sucesso');
});

// Definir porta padrão
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

