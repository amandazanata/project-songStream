import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
// import searchAlbumsApi from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    nome: '',
    artista: false,
    carregando: false,
    // albumEncontrado: true,
  };

  artistValidate = () => {
    const { nome } = this.state;
    const validName = nome.length >= 2;

    this.setState({ artista: validName });
  };

  inputChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.artistValidate);
  };

  mjAgresteBaiano = (albumId) => {
    const { history } = this.props;
    history.push(`album/${albumId}`);
  };

  /*   wgFunction () {
    // albumEncontrado true

    // verifica album
  }
 */
  render() {
    const {
      artista,
      carregando,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            data-testid="search-artist-input"
            type="text"
            name="nome"
            onChange={ this.inputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ !artista }
          >
            Pesquisar
          </button>
          { carregando ? (<Loading />) : (
            <div>
              <button
                type="submit"
                data-testid={ `link-to-album-${collectionId}` }
                onClick={ () => this.mjAgresteBaiano }
              >
                Ir para o álbum
              </button>
              {/* ternário para wgFunction com null ou nenhum album */}
            </div>

          )}
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Search;
