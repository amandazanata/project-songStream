import React from 'react';
import Header from '../components/Header';
/* import { getUser } from '../services/userAPI'; */

class Profile extends React.Component {
/*   state = {
    name: '',
    email: '',
    bio: '',
    img: '',
    carregando: false,
  };

  componentDidMount() {
    this.setState({ carregando: true }, async () => {
      const user = await getUser();

      this.setState({
        name: user.name,
        email: user.email,
        bio: user.description,
        img: user.image,
        carregando: false,
      });
    });
  } */

  render() {
    return (
      <div data-testid="page-profile">
        <Header />
      </div>
    );
  }
}

export default Profile;
