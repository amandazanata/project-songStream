import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    name: '',
  };

  render() {
    const { name } = this.state;
    const tres = 3;

    return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ ({ target }) => this.setState({ name: target.value }) }
        />

        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ name.length < tres }
          onClick={ createUser({ name: { name } }) }
        >
          Entrar
        </button>
      </div>
    );
  }
}
