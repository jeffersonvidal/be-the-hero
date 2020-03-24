const express = require('express'); //importando funcionalidades do express
const routes = require('./routes'); //importando arquivo de rotas

const app = express(); //instanciando express na variável app
app.use(express.json());// aplicação vai trabalhar com json
app.use(routes);

app.listen(3333); //porta usada pela aplicação
