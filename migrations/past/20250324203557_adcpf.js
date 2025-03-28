exports.up = function(knex) { //criação da tabela up cria tabela
    return knex.schema.alterTable('cadastro', table => { //alterar tabela 
        table.string('cpf'); //criar tabela cpf
    });
};

exports.down = function(knex) { // revisão da migration down exclui 
    return knex.schema.dropTable('cadastro'); // Remove a tabela ao reverter
};