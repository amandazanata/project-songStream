import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends React.Component {
  state = {
    name: '',
    paginaCarregando: false,
  };

  async componentDidMount() {
    this.setState({
      paginaCarregando: true,
    }, async () => {
      const user = await getUser();

      this.setState({
        name: user.name,
        paginaCarregando: false,
      });
    });
  }

  render() {
    const { name, paginaCarregando } = this.state;
    return (
      <header data-testid="header-component">
        { paginaCarregando ? <Carregando /> : (
          <h2 data-testid="header-user-name">{name}</h2>) }
        <div>
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Search
          </Link>

          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>

          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Profile
          </Link>

        </div>
      </header>
    );
  }
}

export default Header;
