const cnct = require('../hots/cnct');
// SELECIONAR TODOS
const getAllTransactions = (req, res) => {
    cnct.query('select * from transaction', (err, results) => {
        if (err) {
            console.error('Erro ao obter transações', err);
            res.status(500).send('Erro ao obter transações');
            return;
        }
        res.json(results);
    });
};
// ADICIONAR PRODUTOS
const addAllTransactions = (req, res) => {
    const { nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade } = req.body;
    cnct.query(
        'insert into transaction (nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade) VALUES (?, ?, ?, ?, ?, ?)',
        [nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar transação', err);
                res.status(500).send('Erro ao adicionar transação');
                return;
            }
            res.send('Transação adicionada com sucesso');
        }
    );
};
// UPDATE TOTAL
const updateTransactionsPut = (req, res) => {
    const { id } = req.params;
    const { nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade } = req.body;
    cnct.query(
        'update transaction set nome_produto = ?, desc_produto = ?, categoria = ?, preco = ?, QNT_STQ = ?, data_validade = ? WHERE id = ?',
        [nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade, id],
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar transação', err);
                res.status(500).send('Erro ao atualizar transação');
                return;
            }
            res.send('Transação atualizada com sucesso');
        }
    );
};
//UPDATE PARCIAL
const updateTransactionPatch = (req, res) => {
    const { id } = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    }

    values.push(id);

    cnct.query(
        `update transaction set ${query.join(', ')} where id = ?`,
        values,
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar transação', err);
                res.status(500).send('Erro ao atualizar transação');
                return;
            }
            res.send('Transação atualizada com sucesso');
        }
    );
};
//DELETAR
const deleteTransaction = (req, res) => {
    const { id } = req.params;
    cnct.query(
        'delete from transaction where id = ?',
        [id],
        (err, results) => {
            if (err) {
                console.error('Erro ao deletar transação', err);
                res.status(500).send('Erro ao deletar transação');
                return;
            }
            res.send('Transação deletada com sucesso');
        }
    );
};

module.exports = {
    getAllTransactions,
    addAllTransactions,
    updateTransactionsPut,
    updateTransactionPatch,
    deleteTransaction
};
