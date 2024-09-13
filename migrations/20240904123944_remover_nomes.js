exports.up = function(knex) {
    return knex.schema.alterTable('pessoas', table => {
        table.dropColumn('nome')
        table.dropColumn('cpf')
        table.dropColumn('ibge')
        table.string('cid-10')
        table.string('descricao')
    })
};

exports.down = function(knex) {
    return knex.dropTable('pessoas');
};
