import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() { // usando constructor após entender corretamente realizando projeto Online Store
    super();

    this.state = {
      userName: '',
      email: '',
      imagem: '',
      bio: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser(); // A API getUser é usada para recuperar as informações da pessoa logada;

      this.setState({ // As informações da pessoa logada são exibidas na tela;
        userName: user.name,
        email: user.email,
        imagem: user.image,
        bio: user.description,
        loading: false,
      });
    });
  }

  render() {
    const {
      userName,
      email,
      imagem,
      bio,
      loading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profileContainer">
          { loading ? <Loading /> : ( // Enquanto aguarda a resposta da API, exiba a mensagem Carregando....
            <div>
              <div className="profile-row">
                <img
                  src={ imagem }
                  data-testid="profile-image"
                  alt=""
                  className="profile-img"
                />
                <Link to="/profile/edit">Editar perfil</Link>
                {/* Foi criado um link para a rota de edição de perfil com o texto Editar perfil; */}
              </div>
              {/* Ao clicar no link Editar perfil, a navegação acontece corretamente. */}
              <h4>Nome</h4>
              <p>{userName}</p>

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
