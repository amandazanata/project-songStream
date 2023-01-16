import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;
    const { track, isFavorite, favoriteSong } = this.props;

    return (
      loading ? <Loading /> : (
        <div className="individual-music-container">

          <p className="song-title">{track.trackName}</p>
          <div className="audio-favorita-container">
            <audio data-testid="audio-component" src={ track.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor={ track.trackId }>
              Favorita
              <input
                className="favorite"
                type="checkbox"
                data-testid={ `checkbox-music-${track.trackId}` }
                id={ track.trackId }
                onChange={ favoriteSong }
                checked={ isFavorite }
              />
            </label>
          </div>
        </div>
      )

    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  isFavorite: PropTypes.bool,
  favoriteSong: PropTypes.func.isRequired,
};
MusicCard.defaultProps = { isFavorite: false };

export default MusicCard;
