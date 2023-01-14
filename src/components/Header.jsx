import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
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
    console.log(getUser);
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

export default withRouter(Header);
