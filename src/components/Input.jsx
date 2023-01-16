import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      api,
      alteraInput,
      artista,
      alteraValor,
    } = this.props;

    return (
      <form action="" onSubmit={ api }>
        <input
          data-testid="search-artist-input"
          type="text"
          name="artista"
          value={ alteraValor }
          onChange={ alteraInput }
          placeholder="Pesquise"
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ !artista }
        >
          Procurar
        </button>
      </form>
    );
  }
}

Input.propTypes = {
  load: PropTypes.func,
  alteraInput: PropTypes.func,
  artista: PropTypes.bool,
}.isRequired;

export default Input;
