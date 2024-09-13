exports.up = function(knex) {
    return knex.schema.alterTable('pessoas', table => {
        table.string('datadenascimento')
        table.string('cpf')
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('pessoas');
};
