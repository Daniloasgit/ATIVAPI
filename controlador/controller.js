const cnct = require('../host/cnct');
// SELECIONAR TODOS
const getAllTransactions = (req, res) => {
    cnct.query('select * from products', (err, results) => {
        if (err) {
            console.error('Erro ao obter produto', err);
            res.status(500).send('Erro ao obter produto');
            return;
        }
        res.json(results);
    });
};
// ADICIONAR PRODUTOS
const addTransactions = (req, res) => {
    const { nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade } = req.body;
    cnct.query(
        'insert into products (nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade) VALUES (?, ?, ?, ?, ?, ?)',
        [nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar produto', err);
                res.status(500).send('Erro ao adicionar produto');
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
        'update products set nome_produto = ?, desc_produto = ?, categoria = ?, preco = ?, QNT_STQ = ?, data_validade = ? WHERE id = ?',
        [nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade, id],
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar produto', err);
                res.status(500).send('Erro ao atualizar produto');
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
        `update products set ${query.join(', ')} where id = ?`,
        values,
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar produto', err);
                res.status(500).send('Erro ao atualizar produto');
                return;
            }
            res.send('produto atualizado com sucesso');
        }
    );
};
//DELETAR
const deleteTransaction = (req, res) => {
    const { id } = req.params;
    cnct.query(
        'delete from products where id = ?',
        [id],
        (err, results) => {
            if (err) {
                console.error('Erro ao deletar produto', err);
                res.status(500).send('Erro ao deletar produto');
                return;
            }
            res.send('produto deletada com sucesso');
        }
    );
};

module.exports = {
    getAllTransactions,
    addTransactions,
    updateTransactionsPut,
    updateTransactionPatch,
    deleteTransaction
};
