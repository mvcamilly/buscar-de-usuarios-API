exports.up = function (knex) { //criação da tabela up cria tabela 
    return knex.schema.createTable('cadastro', function (table) {
        table.increments('id').primary(); //auto implementada como chave primária 
        table.string('nome').notNullable(); //coluna de nome com string vachar
        table.string('cpf').notNullable().unique(); //coluna de cpf, obrigatorio e unico 
        table.string('telefone', 11).notNullable(); //coluna com telefone e com limite 11 numeros 
    });
};

exports.down = function (knex) { // revisão da migration down exclui 
    return knex.schema.dropTable('cadastro'); //nome da tabela que está relacionada
};