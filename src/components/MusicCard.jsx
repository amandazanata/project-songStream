import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    checando: false,
  };

  componentDidMount() {
    const { carregado } = this.state;

    this.setState({ checando: carregado });
  }

  checkBox = async ({ target }) => {
    const { atualiza, musica, carregando, push } = this.props;

    await carregando(true);

    if (target.carregado) {
      (await addSong(musica));
    } else {
      await removeSong(musica);
    }
    await push();
    await atualiza();
    await carregando(false);
  };

  render() {
    const { checando } = this.state;
    const { trackId, trackName, url } = this.props;

    return (
      <div>
        <div>
          <h2>{trackName}</h2>
        </div>
        <audio data-testid="audio-component" src={ url } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name=""
            id={ trackId }
            onChange={ this.checkBox }
            checked={ checando }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.string,
  trackName: PropTypes.string,
  url: PropTypes.string,
  musica: PropTypes.object,
  push: PropTypes.func,
  carregando: PropTypes.func,
  carregado: PropTypes.bool,
}.isRequired;

export default MusicCard;
