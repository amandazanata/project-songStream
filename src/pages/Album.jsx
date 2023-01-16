import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    carregando: true,
    listaMusica: [],
    artista: '',

  };

  componentDidMount() {
    const prop = this.props;
    const { id } = prop.match.params;
    this.getData(id).then((data) => {
      this.setState({
        listaMusica: data,
        artista: data[0].artistName,
        carregando: false,
      });
    });
  }

  getData = async (id) => {
    const albumInfo = await getMusics(id);
    // console.log(albumInfo);
    return albumInfo;
  };

  render() {
    const {
      carregando,
      artista,
      listaMusica,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {carregando ? <Loading /> : (
          <div>
            <h2 data-testid="artista-name">{artista}</h2>
            <h3 data-testid="album-name">
              {`${listaMusica[0].collectionName}`}
            </h3>
            <ul>
              {listaMusica.map((music, index) => (
                index !== 0 && (
                  <MusicCard
                    key={ music.trackName }
                    trackName={ music.trackName }
                    url={ music.previewUrl }
                  />
                )))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
