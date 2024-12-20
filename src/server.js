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
        const { nome, sobrenome, telefone } = request.body;
        await conn('cadastro').insert({ nome, sobrenome, telefone });
        response.status(201).json({ message: 'registro salvo com sucesso' });
    } catch (error) {
        console.error(error)
        response.status(500).json({error: 'registro não realizado'});
    }
}); 

app.get('/cadastro', async (request, response) => {
    try {
    const cadastro = await conn('cadastro').select().limit(10)
    if (cadastro) {
        response.status(200).json(cadastro);
    } else {
        response.status(404).json({ message: 'registro não reconhecido'})
    }
} catch (error) {
    console.log(error)
}
});

// app.put('/cadastro/:id', async (request, response) => {
//     console.log("registrado")
//     try {
//         const { id } = request.params
//         const { nome, sobrenome, telefone, } = request.body
//         await conn('pessoas').where({ id: +id }).update(
//             {
//                 nome,
//                 sobrenome,
//                 telefone,
//             });
//         return response.status(200).send('ok')

//     } catch (error) {
//         response.status(500).json({ error: 'erro ao digitar', error: error.message })
//     }
// });


app.put('/cadastro/:id', async (request, response) => {
    try {
        const { id } = request.params; // Captura o ID dos parâmetros
        const { nome, sobrenome, telefone } = request.body; // Captura os dados do corpo da requisição

        // Validação básica
        if (!nome || !sobrenome || !telefone) {
            return response.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Atualização no banco de dados
        const rowsUpdated = await conn('cadastro')
            .where({ id: +id }) // Garante que o ID é numérico
            .update({ nome, sobrenome, telefone });

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



////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/menssage", (request, response) => {
    console.log(request.body)
    response.json({});
});

app.post("/head", async (request, response) => {
    console.log()
    try {
        const { nome, telefone, cpf, ibge } = request.body;
        await conn('pessoas').insert({ nome, telefone, cpf, ibge });
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
});

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
        response.status(500).json({ error: 'erro ao editar', error: error.message })
    }
});

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

app.delete('usuario/:id/', async (request, response) => {
    try {
        const { id } = resquest.parambs
        await conn("usuario").where({id: + id}).del()
        response.status(200).json({ message: 'cadastro excluído com sucesso'})
    } catch(error) {
        response.status(500).json({ error: 'erro ao excluir cadastro', error: error.message })
    }
})


app.put('usuario/id', async (request, response) => {
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
        response.status(500).json({ error: 'error ao editar', })
    }
});


const PORT = 3333;
app.listen(PORT, () => console.log(`essa é a porta ${PORT}`)); 
