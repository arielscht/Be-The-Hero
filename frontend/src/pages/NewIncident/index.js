import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function NewIncident() {
    const ongId = localStorage.getItem('ongId');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [valor, setValor] = useState('');

    const history = useHistory();

    function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            valor,
        }

        try{
            console.log('tentou');
            api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            }).then(response => {
                history.push('/profile');
            }).catch(err => console.log(err));
        } catch(err) {
            alert('Não foi possível cadastrar o caso, por favor tente novamente');
        }
    }

 return(
    <div className="new-incident-container">
    <div className="content">
        <section>
            <img src={logoImg} alt="Be The Hero"/>

            <h1>Cadastrar novo caso</h1>

            <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
            <Link className="back-link" to="/profile">
                <FiArrowLeft size={16} color="#e02041" />
                Voltar para home
            </Link>
        </section>
        <form onSubmit={handleNewIncident}>
            <input 
                placeholder="Título do caso" 
                value={title}
                onChange={ e => setTitle(e.target.value) }
            />
            <textarea 
                placeholder="Descrição"
                onChange={ e => setDescription(e.target.value)}
                value={description}
            />
            <input 
                placeholder="Valor em reais"
                value={valor}
                onChange={ e => setValor(e.target.value) }
            />
            <button type="submit" className="button">
                Cadastrar
            </button>
        </form>
    </div>
</div>
 );
}