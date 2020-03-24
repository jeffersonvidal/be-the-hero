const express = require('express');

const routes = express.Router();

routes.get('/users', (request, response) => {
  return response.json({
    evento: 'Semana Oministack 11',
    aluno: 'MrVIDAL'
  });
});

module.exports = routes; //exporta as rotas para toda aplicação

