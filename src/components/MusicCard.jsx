import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const {
      url,
      trackName,
    } = this.props;

    return (
      <div>
        <h1>{trackName}</h1>
        <audio data-testid="audio-component" src={ url } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  url: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
