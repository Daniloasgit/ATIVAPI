const express = require('express');
const router =  express.Router();
const controller = require ('../controlador/controller');

//seleciona todos os produtos
router.get('/',controller.getAllTransactions);

//adiciona um novo produto
router.post('/',controller.addTransactions);

//atualiza um produto de forma total
router.put('/:id',controller.updateTransactionsPut);

//atualiza um produto de forma parcial
router.patch('/:id',controller.updateTransactionPatch);

//deleta um produto por id
router.delete('/:id',controller.deleteTransaction);

module.exports = router;