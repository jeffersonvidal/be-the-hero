const express = require('express');
const OngController = require('./controllers/OngController'); // Importando controller Ongs
const IncidentController = require('./controllers/IncidentContrller'); // Importando controller Incidents

const routes = express.Router();

/** Rota para listar ongs cadastradas */
routes.get('/ongs', OngController.index);
/** Rota para cadastrar ongs */
routes.post('/ongs', OngController.create);
/** Rota para cadastrar incident */
routes.post('/incidents', IncidentController.create);
/** Rota para listar incidents cadastradas */
routes.get('/incidents', IncidentController.index);
/** Rota para excluir incidents cadastradas */
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes; //exporta as rotas para toda aplicação

