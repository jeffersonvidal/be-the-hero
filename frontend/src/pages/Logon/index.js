import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api'; //conexão com api (backend)
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  /** Pega dados dos campos do form */
  const [id, setId] = useState('');

  /** Usado para enviar usuário para rota profile */
  const history = useHistory();

  /** Validação se a ONG existe */
  async function handleLogin(e){
    e.preventDefault(); //evita carregamento da página ao clicar no button do form
    
    try {
      const response = await api.post('sessions', {id});

      /** Disponibiliza dados do usário para toda aplicação, salvando no storage do navegador */
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      /** Redireciona usuário para página de perfil */
      history.push('/profile');
    } catch (err) {
      alert('Falha no login. Verifique se digitou corretamente sua ID e tente novamente.');
    }
  }

  /** Renderiza HTML */
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}