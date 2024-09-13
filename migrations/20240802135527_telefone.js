exports.up = function(knex) {
        return knex.schema.alterTable('pessoas', table => {
            table.dropColumn('datadenascimento')
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pessoas');
};
