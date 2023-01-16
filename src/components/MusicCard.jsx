import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() { // usando constructor após entender corretamente realizando projeto Online Store
    super();

    this.state = {
      carregando: false,
    };
  }

  render() {
    const { carregando } = this.state;
    const {
      track,
      isFavorite,
      favoriteSong } = this.props;

    return (
      carregando ? <Loading /> : (
        <div>
          <p className="song-title">{track.trackName}</p>
          <div>
            <audio data-testid="audio-component" src={ track.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>

            </audio>
            <label htmlFor={ track.trackId }>

              Favorita

              <input
                data-testid={ `checkbox-music-${track.trackId}` }
                type="checkbox"
                id={ track.trackId }
                checked={ isFavorite }
                onChange={ favoriteSong }
              />
            </label>
          </div>
        </div>
      )

    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({ // dica: https://dev.to/cesareferrari/how-to-specify-the-shape-of-an-object-with-proptypes-3c56
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  isFavorite: PropTypes.bool,
  favoriteSong: PropTypes.func.isRequired,
};
MusicCard.defaultProps = { isFavorite: false }; // https://medium.com/@henrique.weiand/react-defaultprops-proptypes-plano-de-aula-vi-2ac0f990cdd9

export default MusicCard;
