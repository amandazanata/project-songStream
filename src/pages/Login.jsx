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
      isLoggedIn: false,
      isButtonDisabled: true,
    };
  }

  handleChange({ target }) {
    const number = 3;

    this.setState(() => ({
      name: target.value,
      isButtonDisabled: target.value.length < number,
    }));
  }

  aguardaClick(event) {
    const { name } = this.state;

    event.preventDefault();
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      this.setState({
        loading: false,
        isLoggedIn: true,
      });
    });
  }

  render() {
    const {
      name,
      isButtonDisabled,
      isLoggedIn,
      loading } = this.state;

    return (
      <div data-testid="page-login" className="loginFormContainer">
        {loading === true
          ? <Loading />
          : (
            <form>
              <input
                data-testid="login-name-input"
                type="text"
                value={ name }
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
        {isLoggedIn && <Redirect to="/search" />}
        {/* tentei usar history.push, mas não funcionou */}
        {/* dica https://www.youtube.com/watch?v=tiAlSpyWIDs&ab_channel=PedroTech */}
      </div>
    );
  }
}

export default Login;
