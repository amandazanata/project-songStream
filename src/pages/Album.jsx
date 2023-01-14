import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    carregando: false,
    album: [],
    arte: '',
    artista: '',
    nomeAlbum: '',
    musicasFavoritas: [],
  };

  componentDidMount() {
    this.procuraMusica();
    this.musicasFavoritas();
  }

  async aguardaMusica(track) {
    const { musicasFavoritas } = this.state;

    this.setState({ carregando: true });
    if (musicasFavoritas.some(({ trackId }) => trackId === track.trackId)) {
      await removeSong(track);
      this.setState({ carregando: true });
    } else {
      await addSong(track);
      this.setState({ carregando: true });
    }
    await getFavoriteSongs().then((resposta) => this.setState(() => ({
      musicasFavoritas: resposta,
    })));
    this.setState({ carregando: false });
  }

  async musicasFavoritas() {
    const musicasFavoritas = await getFavoriteSongs();

    this.setState({ musicasFavoritas });
  }

  async procuraMusica() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);

    if (musics !== undefined) {
      this.setState({
        album: musics,
        artista: musics[0].artistName,
        nomeAlbum: musics[0].collectionName,
        arte: musics[0].artworkUrl100,
      });
    }
  }

  render() {
    const {
      carregando,
      album,
      arte,
      artista,
      nomeAlbum,
      musicasFavoritas,
    } = this.state;

    return (

      <div data-testid="page-album">
        <Header />
        <div className="album-container">
          <div className="album-info-container">
            <img src={ arte } alt={ nomeAlbum } />
            <p data-testid="album-name">{ nomeAlbum }</p>
            <p data-testid="artist-name">{ artista }</p>
          </div>
          { carregando ? <Carregando /> : (
            <div className="music-container">

              <p className="text-found-album">
                {`Musicas encontradas para o álbum ${nomeAlbum}`}
              </p>
              {album.slice(1).map((track) => (
                <MusicCard
                  key={ track.trackId }
                  track={ track }
                  isFavorite={ musicasFavoritas
                    .some((music) => music.trackId === track.trackId) }
                  favoriteSong={ () => this.aguardaMusica(track) }
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
