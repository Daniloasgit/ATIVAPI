const express = require ('express');
const router =  express.router();
const controller = require ('../controlador/controller');

router.get('/',controller.getAllTransactions);

router.post('/',controller.addAllTransactions);

router.put('/:id',controller.updateTransactionsPut);

router.patch('/:id',controller.updateTransactionPatch);

router.delete('/:id',controller.deleteTransaction);

module.exports = router;