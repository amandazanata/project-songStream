import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    nome: '',
    carregando: true,
  };

  componentDidMount() {
    this.guardaNome()
      .then((resp) => this.setState({ nome: resp, carregando: false }));
  }

  guardaNome = async () => {
    const user = await getUser();
    const retorno = user.name;
    return retorno;
  };

  render() {
    const { nome, carregando } = this.state;

    return (
      <header data-testid="header-component">
        <nav>
          <ul>
            <li>
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                Pesquisa
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favoritas
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
        { carregando ? <Loading /> : (
          <h2 data-testid="header-user-name">{nome}</h2>
        ) }
      </header>
    );
  }
}

export default Header;
