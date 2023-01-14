import React from 'react';
import PropTypes from 'prop-types';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  state = {
    carregando: false,
  };

  render() {
    const { carregando } = this.state;
    const { musica, favorita, favMusica } = this.props;

    return (
      carregando ? <Carregando /> : (
        <div className="individual-music-container">

          <p className="song-title">{musica.trackName}</p>

          <audio data-testid="audio-component" src={ musica.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>

          <label htmlFor={ musica.trackId }>
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${musica.trackId}` }
              id={ musica.trackId }
              onChange={ favMusica }
              checked={ favorita }
            />
          </label>
        </div>
      )

    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  favorita: PropTypes.bool,
  favMusica: PropTypes.func.isRequired,
};
MusicCard.defaultProps = { favorita: false };

export default MusicCard;
