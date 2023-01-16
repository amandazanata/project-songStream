import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    nome: '',
    artista: false,
    carregando: false,
    respostaApi: false,
    chamaApi: [],
  };

  validaClick = () => {
    const { nome } = this.state;
    const nomeArtista = nome.length >= 2;

    this.setState({ artista: nomeArtista });
  };

  pesquisaAlbum = async () => {
    const { nome } = this.state;
    const album = await searchAlbumsAPI(nome);

    this.setState({
      chamaApi: album,
      carregando: false,
      respostaApi: true,
    });
  };

  carregaAlbum = (event) => {
    event.preventDefault();

    this.setState({ carregando: true }, this.pesquisaAlbum);
  };

  aguardaChamada({ target }) {
    this.setState({
      [target.name]: target.value }, this.validaClick);
  }

  render() {
    const {
      nome,
      artista,
      carregando,
      respostaApi,
      chamaApi,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header
          carregaAlbum={ this.carregaAlbum }
          aguardaChamada={ this.aguardaChamada }
          artista={ artista }
          value={ nome }
        />
        { carregando && (
          <form onSubmit={ this.carregaAlbum } action="">
            <input
              data-testid="search-artist-input"
              type="text"
              name="nome"
              onChange={ this.aguardaChamada }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ !artista }
            >
              Pesquisar
            </button>
          </form>) }
        <div>
          { carregando ? <Loading /> : (
            <div>
              {chamaApi.length === 0 ? respostaApi && (
                <h2>Nenhum álbum foi encontrado</h2>
              ) : (
                <div>
                  <h2>{`Resultado de álbuns de: ${nome}`}</h2>
                  {chamaApi.map(({
                    collectionName,
                    artworkUrl100,
                    collectionId,
                    artistName,
                  }, index) => (
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      key={ `${collectionName}-${index}` }
                      to={ `album/${collectionId}` }
                    >
                      <li>
                        <img src={ artworkUrl100 } alt={ collectionName } />
                        <h2>{collectionName}</h2>
                        <h3>{artistName}</h3>
                      </li>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
