import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    name: '',
    paginaCarregando: false,
  }

async componentDidMount() {
  this.setState({
    paginaCarregando: true,
  }, async () => {
    const name = await getUser();
  })
}


  render() {
    const { name, paginaCarregando } = this.state
    return (
      <>
      <header data-testid="header-component">
        <span data-testid="header-user-name">
          { getUser }
          <div>
            <br />
        <Link to="/search">Search</Link>
        <br />
        <Link to="/favorites">Favorites</Link>
        <br />
        <Link to="/profile">Profile</Link>
          </div>
        </span>
      </header>
      </>
    )
  }
}

export default Header;
