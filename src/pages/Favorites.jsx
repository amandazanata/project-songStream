import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';

class Favorites extends React.Component {
  state = {
    favoritas: [],
    carregando: false,
  };

  componentDidMount() {
    this.salvaFavoritas();
  }

  async aguardaMusica(track) {
    this.setState({ carregando: true });
    await removeSong(track);

    this.setState({ carregando: true });
    await this.salvaFavoritas();

    this.setState({ carregando: false });
  }

  async salvaFavoritas() {
    this.setState({ carregando: true });
    await getFavoriteSongs().then((resposta) => this.setState({ favoritas: resposta }));

    this.setState({ carregando: false });
  }

  render() {
    const { favoritas, carregando } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {carregando ? <Carregando /> : null}
        <p>
          Músicas favoritas
        </p>
        {favoritas.map((track) => (
          <MusicCard
            key={ track.trackId }
            track={ track }
            isFavorite={ favoritas.some((music) => music.trackId === track.trackId) }
            favoriteSong={ () => this.aguardaMusica(track) }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
