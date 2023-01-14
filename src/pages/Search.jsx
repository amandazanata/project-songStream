import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Carregando from './Carregando';

class Search extends React.Component {
  state = {
    nomePesquisa: '',
    inputPesquisa: '',
    carregando: false,
    respostaApi: false,
    chamaApi: [],
  };

  aguardaChamada({ target }) {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    });
  }

  async aguardaClick(event) {
    event.preventDefault();

    const { inputPesquisa } = this.state;

    this.setState({
      carregando: true,
      nomePesquisa: inputPesquisa,
    });

    const chamaApi = await searchAlbumsAPI(inputPesquisa);

    this.setState({
      inputPesquisa: '',
      carregando: false,
      respostaApi: true,
      chamaApi,
    });
  }

  albumFunc() {
    const { nomePesquisa, chamaApi } = this.state;

    return chamaApi.length === 0
      ? <p>Nenhum álbum foi encontrado</p>
      : (
        <div>
          <p>
            {`Resultado de álbuns de: ${nomePesquisa}`}
          </p>
          <div>
            {chamaApi.map((album) => (
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                key={ album.collectionId }
                to={ `/album/${album.collectionId}` }
              >
                <div>
                  <img src={ album.collectionId } alt={ album.collectionName } />
                </div>
                <div>
                  <p>{album.artistName}</p>
                  <p>{album.collectionName}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
  }

  render() {
    const { inputPesquisa, carregando, respostaApi } = this.state;
    const number = 2;

    return (
      <div data-testid="page-search">
        <Header />
        { carregando ? <Carregando /> : (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              value={ inputPesquisa }
              name="inputPesquisa"
              id="inputPesquisa"
              placeholder="Nome do Artista"
              onChange={ this.aguardaChamada }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ inputPesquisa.length < number }
              onClick={ this.aguardaClick /* && this.albumFunc */ }
            >
              Pesquisar
            </button>
          </form>
        ) }
        <div>
          { respostaApi ? this.albumFunc() : null }
        </div>
      </div>
    );
  }
}

export default Search;
