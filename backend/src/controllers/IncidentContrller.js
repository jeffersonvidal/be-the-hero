const connection = require('../database/connection'); //impota conexão com banco de dados

module.exports = {
  /** Lista incidents cadastrados */
  async index(request, response) {
    /** busca parametro page, se não existir define ele como 1 que será a página 1 para realizar a paginação de resultados */
    const { page = 1 } = request.query;

    /** Conta todos os casos no bando de dados */
    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      /** Pega os dados da ong da tabela ongs */
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5) //limite de registros por página
      .offset((page - 1) * 5) //quantos registros ele vai pular para exibir na próxima página
      .select(['incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]); //pega todos os registros de incidents e campos específicos da tabela ongs

    /** Cria cabeçalho com o total de registros no banco */
    response.header('X-Total-Count', count['count(*)']);

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
  },

  /** Deleta incident da tabela */
  async delete(request, response) {
    const { id } = request.params; //id do registro passado por parâmetro
    const ong_id = request.headers.authorization; //id da ong que está deletando o registro

    /** Seleciona incident criado pela ong para ser deletado */
    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();
    /** Se a ong que deseja deletar o registro não for a que criou e está logada retorna status http 401 (não autorizado) */
    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    /** Se estiver tudo certo, deleta o registro da tabela */
    await connection('incidents').where('id', id).delete();

    /** 204 = responsta que deu sucesso mas não tem conteúdo para ser exibido */
    return response.status(204).send();
  }
};