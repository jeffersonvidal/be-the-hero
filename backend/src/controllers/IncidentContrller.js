const connection = require('../database/connection'); //impota conexão com banco de dados

module.exports = {
  /** Lista incidents cadastrados */
  async index(request, response) {
    const incidents = await connection('incidents').select('*');
    return response.json(incidents);
  },

  /** Cria tabela Incident (caso) */
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization; //pega o id da ong que está cadastradndo o caso

    //insere os dados na tabela já pegando o id do registro
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id }); //retorna o id do registro cadastrado
  }
};