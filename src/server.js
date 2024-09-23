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

app.post("/menssage", (request, response) => {
    console.log(request.body)
    response.json({});
});

app.post("/head", async (request, response) => {
    console.log()
    try {
        const { nome, telefone, cpf, ibge } = request.body;
        await conn('pessoas').insert({ nome, telefone, cpf, ibge});
        response.status(201).json({ message: 'cadastro feito com sucesso' });
    } catch (error) {
        console.error(error)
        response.status(500).json({ error: 'cadastro não realizado' });
    }
});

app.get('/pessoas', async (request, res) => {
    const cadastro = await conn('pessoas').select()
    if (cadastro) {
        res.status(200).json(cadastro);
    } else {
        res.status(404).json({ message: 'Cadastro não reconhecido' })
    }
});

app.delete('/pessoas/:id', async (request, response) => {
    try {
        const { id } = request.params
        await conn("pessoas").where({ id: +id }).del()
        response.status(200).json({ message: 'cadastro exclúido com sucesso' })
    } catch (error) {
        response.status(500).json({ error: 'erro ao excluir cadastro', error: error.message })
    }
})

app.put('/pessoas/:id', async (request, response) => {
    console.log("qualquercoisa")
    try {
        const { id } = request.params
        const { nome, telefone, cpf, ibge } = request.body
        await conn('pessoas').where({ id: +id }).update(
            {
                nome,
                telefone,
                cpf,
                ibge,
            });
        return response.status(200).send('ok')

    } catch (error) {
        response.status(500).json({ error: 'erro ao editar', error: error.message })
    }
     
});



//rotas de usuarios

app.post("/passagem", (request, response) => {
    console.log(request.body)
    response.json({});
});




//função de registro dos dados salvos 
app.get('/usuarios', async (request, response) => {
    const cadastro = await conn('usuarios').select('*')
    if (cadastro) {
        response.status(200).json(cadastro);
    } else {
        response.status(404).json({ message: 'cadastro não reconhecido' })
    }
});

//rota para salvar os dados 
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, cpf, senha } = req.body;
        await conn('usuarios').insert({ nome, cpf, senha });
        res.status(201).json({ message: 'cadastro realizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'cadastro não realizado' })
    }
});

app.put('/usuarios/:id', async (request, response) => {
    console.log('')
    try {
        const { id } = request.params
        const { nome, cpf } = request.body
        await conn('usuarios').where({ id: +id }).update(
            {
                nome,
                cpf,
            });
        return response.status(200).send('ok')

    } catch (error) {
        response.status(500).json({ error: 'erro ao editar', error: error.message})
    }
});

app.put

//rota para excluir dados
app.delete('/usuarios/:id', async (request, response) => {
    try {
        const { id } = request.params
        await conn("usuarios").where({ id: +id }).del()
        response.status(200).json({ message: 'cadastro excluído com sucesso' })
    } catch (error) {
        response.status(500).json({ error: 'erro ao excluir cadastro', error: error.message })
    }
});
    

app.put('usuario/id', async (request, response) => {
    console.log('')
    try{
    const { id } = request.params
    const { nome, cpf } = request.body
    await conn('usuarios').where({ id: +id}).update(
        {
            nome,
            cpf,
        });
    return response.status(200).send('ok')

} catch (error) {
    response.status(500).json({ error: 'error ao editar', })
} 
});


const PORT = 3333;
app.listen(PORT, () => console.log(`essa é a porta ${PORT}`)); 
