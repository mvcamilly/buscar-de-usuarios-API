exports.up = function (knex) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary();
        table.string('nome');
        table.string('cpf');
        table.string('senha');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('usuarios');
};
