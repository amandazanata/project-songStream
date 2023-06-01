import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() { // usando constructor após entender corretamente realizando projeto Online Store
    super();

    this.state = {
      nome: '',
      pesquisa: '',
      requisicao: false,
      carregando: false,
      api: [],
    };

    this.albumPesquisado = this.albumPesquisado.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) { // dica https://pt-br.reactjs.org/docs/forms.html
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    });
  }

  async handleClick(event) { // usa preventDefault para não atualizar a página
    event.preventDefault();

    const { pesquisa } = this.state;

    this.setState({
      carregando: true, // Ao clicar no botão, a mensagem Carregando... é exibida
      nome: pesquisa,
    });

    const api = await searchAlbumsAPIs(pesquisa); // Ao clicar em pesquisar, a requisição é feita usando a searchAlbumsAPI;

    this.setState({
      api,
      pesquisa: '',
      carregando: false, // removida após o retorno da API;
      requisicao: true,
    });
  }

  albumPesquisado() { // Ao receber o retorno da API, os álbuns são listados na tela;
    const { api, nome } = this.state;

    return api.length === 0
      ? <p>Nenhum álbum foi encontrado</p> // Caso a API não retorne nenhum álbum, a mensagem Nenhum álbum foi encontrado é exibida;
      : (
        <div className="search-result">
          <p className="result-text">{`Resultado de álbuns de: ${nome}`}</p>
          {/* Ao clicar no botão, o texto Resultado de álbuns de: <artista> aparece na tela; */}
          <div className="album-miniature-div">
            {api.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                className="album-miniature-link"
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` } // Existe um link para cada álbum listado que redirecione para a rota /album/:id.
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
    const { pesquisa, carregando, requisicao } = this.state;
    const number = 2;

    return (
      <div data-testid="page-search">
        <Header />
        {carregando ? <Loading /> : (
          <form className="search-form">
            <input // Ao navegar para a rota /search, o input e o botão estão presentes na tela;
              data-testid="search-artist-input"
              type="text"
              name="pesquisa"
              id="pesquisa"
              value={ pesquisa }
              onChange={ this.handleChange }
              placeholder="Nome do Artista"
            />
            <button // Ao navegar para a rota /search, o input e o botão estão presentes na tela;
              data-testid="search-artist-button"
              type="submit"
              id="btn-search-form"
              disabled={ pesquisa.length < number } // O botão está habilitado somente se o input de nome tiver 2 ou mais caracteres.
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
        )}

        { requisicao ? this.albumPesquisado() : null }
        {/* // Ao receber o retorno da API, os álbuns são listados na tela; */}

      </div>

    );
  }
}

export default Search;
