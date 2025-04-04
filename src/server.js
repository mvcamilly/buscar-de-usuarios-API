const express = require("express")
const cors = require("cors")
const knex = require("knex")
const morgan = require('morgan')


    
const app = express();
const conn = knex({
    client: 'sqlite3',
    connection: {
        filename: './data.db'
    },
    useNullAsDefault: true
});
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


//localhost3000/primeira pagina
app.post("/cadastro", async (request, response) => {
    console.log()
    try {
        const { nome } = request.body;
        await conn('cadastro').insert({ nome });
        response.status(201).json({ message: 'registro salvo com sucesso' });
    } catch (error) {
        console.error(error)
        response.status(500).json({error: 'registro não realizado'});
    }
}); 

//define a rota GET //async é usado porque a função fará uma consulta assíncrona ao banco de dados.
app.get('/cadastro', async (req, res) => { // req- requisição do cliente, res- resposta do cliente 
    try {  
        const cadastro = await conn('cadastro').select().limit(10); 
            //acessa a tabela cadastro no banco de dados //seleciona todas as tabelas // retorna 10 registros 
        res.status(200).json(cadastro); 
        // retorna codigo 200 (OK), indicando sucesso // envias os registros encontrados no formato Json 
    } catch (error) { //captura e trata de erro 
        console.error("Erro ao buscar cadastros:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
        //retorna o erro 500 indicando (ERRO) para o cliente 
    }
});

app.put('/cadastro/:id', async (request, response) => {
    try {
        const { id } = request.params; //captura o ID dos parametros 
        const { nome, cpf } = request.body; // captura os dados do corpo da requisição

        // Validação básica
        if (!nome || !cpf) {
            return response.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Atualização no banco de dados
        const rowsUpdated = await conn('cadastro')
            .where({ id: +id }) // garante que o ID seja numerico 
            .update({ nome, cpf }); //utiliza os dois dados 

        if (rowsUpdated === 0) {
            return response.status(404).json({ error: 'Usuário não encontrado.' });
        }

        return response.status(200).json({ message: 'Usuário atualizado com sucesso.' });

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
        return response.status(500).json({ error: 'Erro interno no servidor.', details: error.message });
    }
});


app.delete('/cadastro/:id', async (request, response) => {
    try {
        const { id } = request.params
        await conn("cadastro").where({ id: +id }).del()
        response.status(200).json({ message: 'cadastro exclúido com sucesso' })
    } catch (error) {
        response.status(500).json({ error: 'erro ao excluir cadastro', error: error.message })
    }
});


const PORT = 3333;
app.listen(PORT, () => console.log(`essa é a porta ${PORT}`)); 