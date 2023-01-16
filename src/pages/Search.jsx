import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      searchInput: '',
      carregando: false,
      apiRequest: [],
      requestSearch: false,
    };
    this.aguardaApi = this.aguardaApi.bind(this);
    this.aguardaClick = this.aguardaClick.bind(this);
    this.showAlbum = this.showAlbum.bind(this);
  }

  aguardaApi({ target }) {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  }

  async aguardaClick(event) {
    event.preventDefault();
    const { searchInput } = this.state;
    this.setState({
      carregando: true,
      name: searchInput,
    });
    const apiRequest = await searchAlbumsAPIs(searchInput);
    this.setState({
      apiRequest,
      searchInput: '',
      carregando: false,
      requestSearch: true,
    });
  }

  showAlbum() {
    const { apiRequest, name } = this.state;
    return apiRequest.length === 0 ? <p>Nenhum álbum foi encontrado</p>
      : (
        <div className="search-result">
          <p className="result-text">{`Resultado de álbuns de: ${name}`}</p>
          <div className="album-miniature-div">
            {apiRequest.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                className="album-miniature-link"
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <div className="album-miniature">
                  <div className="album-image">
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  </div>
                  <div className="album-artist-info">
                    <p>{album.collectionName}</p>
                    <p>{album.artistName}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>);
  }

  render() {
    const { searchInput, carregando, requestSearch } = this.state;
    const number = 2;
    return (
      <div data-testid="page-search">
        <Header />
        {carregando ? <Loading /> : (
          <form className="search-form">
            <input
              data-testid="search-artist-input"
              type="text"
              name="searchInput"
              id="searchInput"
              placeholder="Nome do Artista"
              value={ searchInput }
              onChange={ this.aguardaApi }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              id="btn-search-form"
              disabled={ searchInput.length < number }
              onClick={ this.aguardaClick }
            >
              Pesquisar
            </button>
          </form>
        )}
        { requestSearch ? this.showAlbum() : null }
      </div>
    );
  }
}

export default Search;
