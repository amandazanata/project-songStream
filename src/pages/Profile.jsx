import React from 'react';
// import { Link } from 'react-router-dom';
// import { getUser } from '../services/userAPI';
import Header from '../components/Header';
// import Loading from '../components/Loading';

class Profile extends React.Component {
/*   state = {
    name: '',
    email: '',
    bio: '',
    img: '',
    carregando: false,
  }; */

  /*  componentDidMount() {
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
  }
 */
  render() {
    /*  const {
      name,
      email,
      bio,
      img,
      carregando } = this.state;
 */
    return (
      <div data-testid="page-profile">
        <Header />
        {/*  <div>
          {carregando ? <Loading /> : (
            <div>
              <div>
                <img
                  src={ img }
                  data-testid="profile-image"
                  alt=""
                />
                <Link to="/profile/edit">
                  Editar perfil
                </Link>
              </div>
              <h2>Nome</h2>
              <h3>{name}</h3>
              <h2>E-mail</h2>
              <h3>{email || 'Nenhum e-mail cadastrado'}</h3>
              <h2>Descrição</h2>
              <h3>{bio || 'Nenhuma descrição cadastrada'}</h3>
            </div>
          )}
        </div> */}
      </div>
    );
  }
}

export default Profile;
