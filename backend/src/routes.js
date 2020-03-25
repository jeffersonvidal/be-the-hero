const express = require('express');
const ongController = require('./controllers/OngController'); // Importando controller Ongs

const routes = express.Router();

/** Rota para listar ongs cadastradas */
routes.get('/ongs', ongController.index);

/** Rota para cadastrar ongs */
routes.post('/ongs', ongController.create);

module.exports = routes; //exporta as rotas para toda aplicação

