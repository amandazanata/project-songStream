import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() { // usando constructor após entender corretamente realizando projeto Online Store
    super();

    this.state = {
      name: '',
      loading: false,
      isButtonDisabled: true,
      isLoggedIn: false,
    };
  }

  handleChange({ target }) {
    const numero = 3;

    this.setState(() => ({ // O botão só é habilitado se o input de nome tiver 3 ou mais caracteres;
      name: target.value,
      isButtonDisabled: target.value.length < numero,
    }));
  }

  aguardaClick(event) {
    const { name } = this.state;

    event.preventDefault();

    this.setState({
      loading: true, // Ao clicar no botão, a mensagem Carregando... é exibida
    }, async () => {
      await createUser({ name }); // Ao clicar no botão habilitado, a função createUser da userAPI é chamada;
      this.setState({
        loading: false,
        isLoggedIn: true,
      });
    });
  }

  render() {
    const {
      name,
      isLoggedIn,
      isButtonDisabled,
      loading } = this.state;

    return (
      <div data-testid="page-login" className="loginFormContainer">
        {loading === true // // ternário para mostrar mensagem de carregando
          ? <Loading />
          : (
            <form>
              <input // Ao navegar para a rota /, o input e o botão especificados estão presentes;
                type="text"
                onChange={ (event) => this.handleChange(event) }
                data-testid="login-name-input"
                value={ name }
                placeholder="Nome"
              />
              <button // Ao navegar para a rota /, o input e o botão especificados estão presentes;
                type="submit"
                data-testid="login-submit-button"
                onClick={ (event) => this.aguardaClick(event) }
                disabled={ isButtonDisabled }
              >
                Entrar
              </button>
            </form>
          )}
        {isLoggedIn && <Redirect to="/search" />}
        {/* // após a resposta da API acontece o redirecionamento para a rota /search. */}
        {/* tentei usar history.push, mas não funcionou */}
        {/* dica https://www.youtube.com/watch?v=tiAlSpyWIDs&ab_channel=PedroTech */}
      </div>
    );
  }
}

export default Login;
