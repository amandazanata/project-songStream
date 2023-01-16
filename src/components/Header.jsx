import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() { // usando constructor após entender corretamente realizando projeto Online Store
    super();

    this.state = {
      name: '',
      carregando: false,
    };
  }

  async componentDidMount() {
    this.setState({
      carregando: true,
    }, async () => {
      const usuario = await getUser();
      this.setState({
        name: usuario.name,
        carregando: false,
      });
    });
  }

  render() {
    const { name, carregando } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          { carregando ? <Loading />
            : (
              <h1 data-testid="header-user-name">{ name }</h1>
            ) }
        </div>
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
      </header>
    );
  }
}

export default Header;
