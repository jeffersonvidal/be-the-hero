/** Criação da tabela de incidents (casos) */
exports.up = function (knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('value').notNullable();
    /** Relacionamento e chave estrangeira da tabela ongs */
    table.string('ong_id').notNullable();
    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

/** Deleta tabela em caso de erro na criação */
exports.down = function (knex) {
  return knex.schema.dropTable('incidents');
};
