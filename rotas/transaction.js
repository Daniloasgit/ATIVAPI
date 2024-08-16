// Importa o módulo express para criar rotas e manipular requisições HTTP
const express = require('express');

// Cria um roteador para definir as rotas relacionadas a um recurso específico (neste caso, transações)
const router = express.Router();

// Importa o controlador que contém a lógica para lidar com as requisições
const controller = require('../controlador/controller');

// Define a rota para obter todos os produtos (ou transações) e associa à função do controlador responsável
router.get('/', controller.getAllTransactions);

// Define a rota para adicionar um novo produto (ou transação) e associa à função do controlador responsável
router.post('/', controller.addTransactions);

// Define a rota para atualizar um produto (ou transação) de forma total, usando o método PUT, e associa à função do controlador responsável
router.put('/:id', controller.updateTransactionsPut);

// Define a rota para atualizar um produto (ou transação) de forma parcial, usando o método PATCH, e associa à função do controlador responsável
router.patch('/:id', controller.updateTransactionPatch);

// Define a rota para deletar um produto (ou transação) por ID, usando o método DELETE, e associa à função do controlador responsável
router.delete('/:id', controller.deleteTransaction);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação
module.exports = router;
