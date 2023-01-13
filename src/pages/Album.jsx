import React, { Component } from 'react';

export default class Album extends Component {
  render() {
    return (
      <>
      <div data-testid="page-album">
        <p data-testid="header-user-name">
        <Header />
        </p>
      </div>
      </>
    );
  }
}
