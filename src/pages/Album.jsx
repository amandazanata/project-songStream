import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super(); // usando constructor após entender corretamente realizando projeto Online Store

    this.state = {
      artista: '',
      nomeAlbum: '',
      capa: '',
      carregando: false,
      album: [],
      favoriteMusics: [],
    };

    this.procuraMusicas = this.procuraMusicas.bind(this);
    this.favoritaMusicas = this.favoritaMusicas.bind(this);
    this.aguardaMusica = this.aguardaMusica.bind(this);
  }

  componentDidMount() {
    this.procuraMusicas();
    this.favoritaMusicas();
  }

  async aguardaMusica(track) { // prop
    const { favoriteMusics } = this.state;
    this.setState({ carregando: true }); // A mensagem Carregando... é exibida após clicar no checkbox e removida depois do retorno da API;
    if (favoriteMusics.some(({ trackId }) => trackId === track.trackId)) {
      await removeSong(track); // A função removeSong é chamada quando algum checkbox que já esteja marcado é clicado;
      this.setState({ carregando: true });
    } else {
      await addSong(track); // A função addSong é chamada quando algum checkbox é clicado;
      this.setState({ carregando: true });
    }
    await getFavoriteSongs().then((res) => this.setState(() => ({ // A requisição para getFavoriteSongs é feita para recuperar as músicas favoritas;
      favoriteMusics: res,
    })));
    this.setState({ carregando: false });
  }

  async favoritaMusicas() { // A requisição para getFavoriteSongs é feita após favoritar uma música;
    const favoriteMusics = await getFavoriteSongs();
    this.setState({ favoriteMusics });
  }

  async procuraMusicas() {
    const { match: { params: { id } } } = this.props; // descontroi prop do react
    const musicas = await getMusics(id); // Se o serviço de musicsAPI está sendo chamado;

    if (musicas !== undefined) { // Se o nome da banda ou artista e o nome do álbum são exibidos;
      this.setState({ // O número de checkboxes marcados como checked aumenta quando um checkbox é clicado.
        album: musicas, // O número de checkboxes marcados como checked diminui quando um checkbox marcado é clicado;
        artista: musicas[0].artistName,
        nomeAlbum: musicas[0].collectionName,
        capa: musicas[0].artworkUrl100,
      });
    }
  }

  render() {
    const {
      album,
      capa,
      nomeAlbum,
      artista,
      favoriteMusics,
      carregando } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-container">
          <div className="album-info-container">
            <img src={ capa } alt={ nomeAlbum } />
            <p data-testid="album-name">{ nomeAlbum }</p>
            <p data-testid="artist-name">{ artista }</p>
          </div>
          { carregando ? <Loading /> : ( // Se todas músicas retornadas pela API são listadas.
            <div className="music-container">
              <p className="text-found-album">
                {`${nomeAlbum}`}
              </p>
              {album.slice(1).map((track) => ( // map para criar os cards
                <MusicCard
                  key={ track.trackId }
                  track={ track }
                  isFavorite={ // prop
                    favoriteMusics.some((music) => music.trackId === track.trackId)
                  }
                  favoriteSong={ () => this.aguardaMusica(track) } // prop - Ao entrar na página, o número de checkboxes marcados como checked é correspondente ao número de músicas que já foram favoritadas;
                />
              ))}
            </div>
          )}

        </div>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({ // dica: https://dev.to/cesareferrari/how-to-specify-the-shape-of-an-object-with-proptypes-3c56
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
