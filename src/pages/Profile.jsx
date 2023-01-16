import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() { // usando constructor após entender corretamente realizando projeto Online Store
    super();

    this.state = {
      nome: '',
      email: '',
      imagem: '',
      bio: '',
      carregando: false,
    };
  }

  componentDidMount() {
    this.setState({ carregando: true }, async () => {
      const user = await getUser(); // chama getUser do userApi

      this.setState({
        nome: user.name,
        email: user.email,
        imagem: user.image,
        bio: user.description,
        carregando: false,
      });
    });
  }

  render() {
    const {
      nome,
      email,
      imagem,
      bio,
      carregando } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profileContainer">
          { carregando ? <Loading /> : (
            <div>
              <div className="profile-row">
                <img
                  data-testid="profile-image"
                  src={ imagem }
                  className="profile-img"
                  alt=""
                />
                <Link to="/profile/edit">Editar perfil</Link>
              </div>

              <h4>Nome</h4>
              <p>{nome}</p>

              <h4>E-mail</h4>
              <p>{email || 'Nenhum e-mail cadastrado'}</p>

              <h4>Descrição</h4>
              <p>{bio || 'Nenhuma descrição cadastrada'}</p>

            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
