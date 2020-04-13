import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'; //conexão com api (backend)
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  /** Busca casos da ONG */
  const [incidents, setIncidents] = useState([]);

  /** Pega os dados da ONG logada */
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  /** Usado para enviar usuário para home após logout */
  const history = useHistory();

  /** useEffect -  */
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  /** Deletar um caso */
  async function handleDeleteIncident(id){
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      /** Remover caso da listagem após ser deletado */
      setIncidents(incidents.filter(incident => incident.id !== id));

    } catch (err) {
      alert('Erro ao deletar caso. Tente novamente.');
    }
  }

  /** Faz logout do sistema */
  function handleLogout(){
    /** Remove os dados do localStorage */
    localStorage.clear();
    history.push('/');
  }

  /** Renderiza HTML */
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vindo(a), {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}