/** Perfil para retornar listagem de incidents específicos da ong */
const connection = require('../database/connection'); //impota conexão com banco de dados

module.exports = {
  /** Retorna casos específicos */
  async index(request, response) {
    /** Pega dados da ong logada */
    const ong_id = request.headers.authorization;
    /** Pega todos os incidents da ong logada */
    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*');

      return response.json(incidents);
  }
};