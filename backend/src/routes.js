const express = require('express');
const crypto = require('crypto'); // para gerar id aleatório
const connection = require('./database/connection'); //impota conexão com banco de dados

const routes = express.Router();

/** Rota para listar ongs cadastradas */
routes.get('/ongs', async (request, response) => {
  const ongs = await connection('ongs').select('*');
  return response.json(ongs);
});

/** Rota para cadastrar ongs */
routes.post('/ongs', async (request, response) => {
  const { name, email, whatsapp, city, uf } = request.body;
  /** Cria id aleatório de 4 bytes converte em string no formato hexadecimal */
  const id = crypto.randomBytes(4).toString('HEX');
  /** Insere dados na tabela do banco */
  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  })
  return response.json({ id });
});

module.exports = routes; //exporta as rotas para toda aplicação

