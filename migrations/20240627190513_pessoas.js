exports.up = function(knex) {
    return knex.schema.createTable('pessoas', table => {
      table.increments('id').primary();
      table.string('nome');
      table.string('telefone');
      table.string('ibge');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('pessoas');
  };
  
  