const express = require('express'); //importando funcionalidades do express
const cors = require('cors'); //importando cors - dá permissão de acesso a api
const routes = require('./routes'); //importando arquivo de rotas

const app = express(); //instanciando express na variável app
app.use(cors()); //qualquer aplicação pode acessar o backend
app.use(express.json());// aplicação vai trabalhar com json
app.use(routes);

app.listen(3333); //porta usada pela aplicação
