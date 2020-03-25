const connection = require('../database/connection'); //impota conexão com banco de dados
const crypto = require('crypto'); // para gerar id aleatório

module.exports = {
  /** Listar ongs */
  async index(request, response) {
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
  },

  /** Cadstrar ong */
  async create(request, response) {
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
  }
};