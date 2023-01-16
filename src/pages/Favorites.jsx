import React from 'react';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    carregando: false,
    lista: [],
  };

  componentDidMount() {
    this.setState({ carregando: true }, this.api);
  }

  api = () => {
    getFavoriteSongs()
      .then((lista) => this
        .setState({ lista, carregando: false }));
  };

  atualiza = async () => {
    const favoritas = await getFavoriteSongs();
    this.setState({ lista: favoritas });
  };

  render() {
    const {
      carregando,
      lista,
    } = this.state;
    return (
      <div data-testid="page-favorites">
        <header>
          Músicas Favoritas
        </header>
        <div>
          {carregando ? <Loading /> : (
            <ul>
              {lista.map((music) => (
                <MusicCard
                  key={ music.trackName }
                  trackName={ music.trackName }
                  url={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                  isLoading={ (retorno) => this.setState({ carregando: retorno }) }
                  refresh={ this.atualiza }
                  checked
                />
              ))}
            </ul>
          ) }
        </div>
      </div>
    );
  }
}

export default Favorites;
