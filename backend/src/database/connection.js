const knex = require('knex');
const configuration = require('../../knexfile');
/** Faz a conexão com o banco de dados */
const connection = knex(configuration.development);

module.exports = connection;//exporta conexão para toda aplicação
