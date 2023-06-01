import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() { // usando constructor após entender corretamente realizando projeto Online Store
    super();

    this.state = {
      carregando: false,
      favoritas: [],
    };

    this.salva = this.salva.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.salva();
  }

  async remove(track) { // funcao para remover musica
    this.setState({ carregando: true });
    await removeSong(track); // A função removeSong é chamada quando algum checkbox que já esteja marcado é clicado;

    this.setState({ carregando: true });
    await this.salva();

    this.setState({ carregando: false }); // A mensagem Carregando... é exibida após clicar no checkbox e removida depois do retorno da API.
  }

  async salva() { // funcao para salvar musica
    this.setState({ carregando: true });
    await getFavoriteSongs().then((res) => this.setState({ favoritas: res })); // A requisição para getFavoriteSongs é feita para recuperar as músicas favoritas;

    this.setState({ carregando: false });
  }

  render() {
    const { favoritas, carregando } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {carregando ? <Loading /> : null}
        <p className="fav-music-title">Músicas favoritas</p>
        {favoritas.map((track) => ( // É exibida a lista de músicas favoritas;
          <MusicCard
            key={ track.trackId }
            track={ track }
            isFavorite={ favoritas.some((music) => music.trackId === track.trackId) } // prop
            favoriteSong={ () => this.remove(track) } // prop - A lista de músicas favoritas é atualizada ao remover uma música da lista.
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
