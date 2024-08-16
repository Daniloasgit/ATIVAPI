// Importa a conexão com o banco de dados a partir do módulo local
const cnct = require('../host/cnct');

// FUNÇÃO PARA SELECIONAR TODOS OS PRODUTOS
const getAllTransactions = (req, res) => {
    // Executa uma consulta SQL para selecionar todos os produtos da tabela "products"
    cnct.query('select * from products', (err, results) => {
        if (err) {
            // Se ocorrer um erro na consulta, exibe uma mensagem de erro no console e retorna um status 500
            console.error('Erro ao obter produto', err);
            res.status(500).send('Erro ao obter produto');
            return;
        }
        // Se a consulta for bem-sucedida, retorna os resultados no formato JSON
        res.json(results);
    });
};

// FUNÇÃO PARA ADICIONAR UM NOVO PRODUTO
const addTransactions = (req, res) => {
    // Desestrutura os dados do corpo da requisição
    const { nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade } = req.body;
    // Executa uma consulta SQL para inserir um novo produto na tabela "products"
    cnct.query(
        'insert into products (nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade) VALUES (?, ?, ?, ?, ?, ?)',
        [nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade],
        (err, results) => {
            if (err) {
                // Se ocorrer um erro na consulta, exibe uma mensagem de erro no console e retorna um status 500
                console.error('Erro ao adicionar produto', err);
                res.status(500).send('Erro ao adicionar produto');
                return;
            }
            // Se a consulta for bem-sucedida, retorna uma mensagem de sucesso
            res.send('Transação adicionada com sucesso');
        }
    );
};

// FUNÇÃO PARA ATUALIZAR UM PRODUTO TOTALMENTE
const updateTransactionsPut = (req, res) => {
    // Obtém o ID do produto a partir dos parâmetros da requisição
    const { id } = req.params;
    // Desestrutura os dados do corpo da requisição
    const { nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade } = req.body;
    // Executa uma consulta SQL para atualizar todos os campos do produto na tabela "products" com base no ID
    cnct.query(
        'update products set nome_produto = ?, desc_produto = ?, categoria = ?, preco = ?, QNT_STQ = ?, data_validade = ? WHERE id = ?',
        [nome_produto, desc_produto, categoria, preco, QNT_STQ, data_validade, id],
        (err, results) => {
            if (err) {
                // Se ocorrer um erro na consulta, exibe uma mensagem de erro no console e retorna um status 500
                console.error('Erro ao atualizar produto', err);
                res.status(500).send('Erro ao atualizar produto');
                return;
            }
            // Se a consulta for bem-sucedida, retorna uma mensagem de sucesso
            res.send('Transação atualizada com sucesso');
        }
    );
};

// FUNÇÃO PARA ATUALIZAR UM PRODUTO PARCIALMENTE
const updateTransactionPatch = (req, res) => {
    // Obtém o ID do produto a partir dos parâmetros da requisição
    const { id } = req.params;
    // Obtém os campos a serem atualizados a partir do corpo da requisição
    const fields = req.body;
    const query = [];
    const values = [];

    // Cria a parte da consulta SQL para atualizar apenas os campos fornecidos
    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    }

    // Adiciona o ID ao final dos valores para a cláusula WHERE
    values.push(id);

    // Executa uma consulta SQL para atualizar os campos especificados na tabela "products" com base no ID
    cnct.query(
        `update products set ${query.join(', ')} where id = ?`,
        values,
        (err, results) => {
            if (err) {
                // Se ocorrer um erro na consulta, exibe uma mensagem de erro no console e retorna um status 500
                console.error('Erro ao atualizar produto', err);
                res.status(500).send('Erro ao atualizar produto');
                return;
            }
            // Se a consulta for bem-sucedida, retorna uma mensagem de sucesso
            res.send('Produto atualizado com sucesso');
        }
    );
};

// FUNÇÃO PARA DELETAR UM PRODUTO
const deleteTransaction = (req, res) => {
    // Obtém o ID do produto a partir dos parâmetros da requisição
    const { id } = req.params;
    // Executa uma consulta SQL para deletar um produto da tabela "products" com base no ID
    cnct.query(
        'delete from products where id = ?',
        [id],
        (err, results) => {
            if (err) {
                // Se ocorrer um erro na consulta, exibe uma mensagem de erro no console e retorna um status 500
                console.error('Erro ao deletar produto', err);
                res.status(500).send('Erro ao deletar produto');
                return;
            }
            // Se a consulta for bem-sucedida, retorna uma mensagem de sucesso
            res.send('Produto deletado com sucesso');
        }
    );
};

// Exporta todas as funções para que possam ser usadas em outros módulos
module.exports = {
    getAllTransactions,
    addTransactions,
    updateTransactionsPut,
    updateTransactionPatch,
    deleteTransaction
};
