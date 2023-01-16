import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    name: '',
    carregando: false,
  };

  async componentDidMount() {
    this.setState({
      carregando: true,
    }, async () => {
      const user = await getUser();

      this.setState({
        name: user.name,
        carregando: false,
      });
    });
  }

  render() {
    const { name, carregando } = this.state;

    return (
      <header data-testid="header-component">
        <nav>
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
        </nav>
        { carregando ? <Loading /> : (
          <h2 data-testid="header-user-name">{name}</h2>) }
      </header>
    );
  }
}

export default Header;
