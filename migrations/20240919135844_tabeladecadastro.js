JZSexports.up = function(knex) {
    return knex.schema.createTable('cadastro', table => {
        table.increments('id').primary();
        table.string('nome');
        table.string('sobrenome');
        table.string('telefone');
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('cadastro');
};
