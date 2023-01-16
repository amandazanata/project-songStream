import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artist: '',
    loading: true,
    musicsList: [],
  };

  componentDidMount() {
    const romeu = this.props;
    const { id } = romeu.match.params;

    this.requisicao(id).then((data) => {
      this.setState({
        musicsList: data,
        artist: data[0].artistName,
        loading: false,
      });
    });
  }

  requisicao = async (id) => {
    const albumInfo = await getMusics(id);
    return albumInfo;
  };

  render() {
    const {
      loading,
      artist,
      musicsList,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <h1 data-testid="artist-name">{artist}</h1>
            <h2 data-testid="album-name">
              {`${musicsList[0].collectionName}`}
            </h2>
            <ul>
              {musicsList.map((music, index) => (
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
