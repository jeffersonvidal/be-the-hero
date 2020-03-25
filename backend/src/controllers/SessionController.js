/** Responsável por criar sessão/login da ong no sistema */
const connection = require('../database/connection'); //impota conexão com banco de dados

module.exports = {
  /** Cria sessão / login */
  async create(request, response) {
    const { id } = request.body; //pega o id informado no formulário de login

    /** Verifica se o id existe no banco de dados */
    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

    /** Se não encontrar o id no banco de dados */
    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID' });
    }

    return response.json(ong);
  }
}

