import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() { // usando constructor após entender corretamente realizando projeto Online Store
    super();

    this.state = {
      name: '',
      loadingPage: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loadingPage: true, // Ao clicar no botão, a mensagem Carregando... é exibida
    }, async () => {
      const usuario = await getUser(); // A função getUser é chamada ao renderizar o componente;

      this.setState({
        name: usuario.name,
        loadingPage: false, // removida após o retorno da API;
      });
    });
  }

  render() {
    const { name, loadingPage } = this.state;

    return (
      <header data-testid="header-component">
        <div>
          { loadingPage ? <Loading /> // A mensagem de Carregando... é exibida ao renderizar o componente
            : (
              <h1 data-testid="header-user-name">{ name }</h1> /* O nome da pessoa usuária está presente na tela após o retorno da API. */
            ) }
        </div>
        <nav>
          {/* Os links de navegação são exibidos na página de pesquisa; */}
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
