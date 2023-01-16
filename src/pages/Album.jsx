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
    this.setState({ carregando: true });
    if (favoriteMusics.some(({ trackId }) => trackId === track.trackId)) {
      await removeSong(track);
      this.setState({ carregando: true });
    } else {
      await addSong(track);
      this.setState({ carregando: true });
    }
    await getFavoriteSongs().then((res) => this.setState(() => ({
      favoriteMusics: res,
    })));
    this.setState({ carregando: false });
  }

  async favoritaMusicas() {
    const favoriteMusics = await getFavoriteSongs();
    this.setState({ favoriteMusics });
  }

  async procuraMusicas() {
    const { match: { params: { id } } } = this.props; // descontroi prop do react
    const musicas = await getMusics(id);

    if (musicas !== undefined) {
      this.setState({
        album: musicas,
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
          { carregando ? <Loading /> : (
            <div className="music-container">
              <p className="text-found-album">
                {`${nomeAlbum}`}
              </p>
              {album.slice(1).map((track) => ( // map para criar o card
                <MusicCard
                  key={ track.trackId }
                  track={ track }
                  isFavorite={ // prop
                    favoriteMusics.some((music) => music.trackId === track.trackId)
                  }
                  favoriteSong={ () => this.aguardaMusica(track) } // prop
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
