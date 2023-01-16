import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() { // usando constructor após entender corretamente realizando projeto Online Store
    super();

    this.state = {
      nome: '',
      isButtonDisabled: true,
      logado: false,
      carregando: false,
    };
  }

  handleChange({ target }) {
    const number = 3;

    this.setState(() => ({
      nome: target.value,
      isButtonDisabled: target.value.length < number,
    }));
  }

  aguardaClick(event) {
    const { nome } = this.state;

    event.preventDefault();

    this.setState({
      carregando: true,
    }, async () => {
      await createUser({ nome });

      this.setState({
        carregando: false,
        logado: true,
      });
    });
  }

  render() {
    const {
      nome,
      isButtonDisabled,
      logado,
      carregando } = this.state;

    return (
      <div data-testid="page-login" className="loginFormContainer">
        {carregando === true
          ? <Loading />
          : (
            <form>
              <input
                data-testid="login-name-input"
                type="text"
                value={ nome }
                onChange={ (event) => this.handleChange(event) }
                placeholder="Nome"
              />
              <button
                data-testid="login-submit-button"
                type="submit"
                disabled={ isButtonDisabled }
                onClick={ (event) => this.aguardaClick(event) }
              >
                Entrar
              </button>
            </form>
          )}
        {logado && <Redirect to="/search" />}
        {/* tentei usar history.push, mas não funcionou */}
        {/* dica https://www.youtube.com/watch?v=tiAlSpyWIDs&ab_channel=PedroTech */}
      </div>
    );
  }
}

export default Login;
