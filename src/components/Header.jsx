import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    getUser,
  }

  componentDidMount() {
    this.pegaUsuario;
  }

  pegaUsuario = () => {
    this.setState({
      getUser,
    })
  }

  render() {
    const { getUser } = this.state
    return (
      <>
      <header data-testid="header-component">
        <span data-testid="header-user-name">
          { getUser }
          <div>
            <br />
        <Link to="/search">Search</Link>
        <br />
        <Link to="/favorites">Favorites</Link>
        <br />
        <Link to="/profile">Profile</Link>
          </div>
        </span>
      </header>
      </>
    )
  }
}
