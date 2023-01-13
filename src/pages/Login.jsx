import React from 'react';
import { withRouter } from 'react-router-dom';
import Carregando from './Carregando';
import NotFound from './NotFound';
import { createUser } from '../services/userAPI';
import Header from '../components/Header';

class Login extends React.Component {
  state = {
    user: '',
  }

  saveUser = () => { // salva no localStorage e muda rota para componente Search caso obtenha sucesso na chamada da API
    const { user } = this.state;
    const { history } = this.props;
    localStorage.setItem('user', JSON.stringify({ name: user }))
    history.push('/search');
  }


  render() {
    const { user } = this.state;
    const tres = 3;

    return (
      <>
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ ({ target }) => this.setState({ user: target.value }) }
          />

        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ user.length < tres }
          onClick={ this.saveUser }
          >
          Entrar
        </button>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
