import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    carregando: false,
    lista: [],
  };

  componentDidMount() {
    this.setState({ carregando: true }, this.load);
  }

  load = () => {
    getFavoriteSongs().then((list) => this.setState({ lista: list, carregando: false }));
  };

  refreshFavorites = async () => {
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
        <Header />
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
                refresh={ this.refreshFavorites }
                checked
              />
            ))}
          </ul>
        ) }
      </div>
    );
  }
}

export default Favorites;
