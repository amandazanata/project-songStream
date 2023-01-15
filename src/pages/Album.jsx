import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    arte: '',
    artista: '',
    nomeAlbum: '',
    carregando: false,
    album: [],
    musicasFavoritas: [],
  };

  componentDidMount() {
    this.procuraMusica();
    this.favoritas();
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

  async favoritas() {
    const musicasFavoritas = await getFavoriteSongs();

    this.setState({ musicasFavoritas });
  }

  async procuraMusica() {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);

    if (musicas !== undefined) {
      this.setState({
        album: musicas,
        artista: musicas[0].artistName,
        nomeAlbum: musicas[0].collectionName,
        arte: musicas[0].artworkUrl100,
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
        <div>
          <div>
            <img src={ arte } alt={ nomeAlbum } />
            <p data-testid="album-name">{ nomeAlbum }</p>
            <p data-testid="artist-name">{ artista }</p>
          </div>
          { carregando ? <Carregando /> : (
            <div>

              <p>
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
