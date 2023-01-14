import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    desab: true,
    logado: false,
    carregando: false,
  };

  validaClick({ target }) {
    const number = 3;
    this.setState(() => ({
      name: target.value,
      desab: target.value.length < number,
    }));
  }

  clicaBotao(event) {
    const { name } = this.state;

    event.preventDefault();

    this.setState({
      carregando: true,
    }, async () => {
      await createUser({ name });
      this.setState({
        carregando: false,
        logado: true,
      });
    });
  }

  render() {
    const { name, desab, logado, carregando } = this.state;
    const { history } = this.props;
    console.log(history);

    return (
      <div>
        <div data-testid="page-login">
          {carregando === true
            ? <Carregando /> : (
              <form>
                <input
                  type="text"
                  data-testid="login-name-input"
                  placeholder="Nome"
                  value={ name }
                  onChange={ (event) => this.validaClick(event) }
                />
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ desab }
                  onClick={ (event) => this.clicaBotao(event) }
                >
                  Entrar
                </button>
              </form>
            )}
          {logado && history.push('/search')}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
