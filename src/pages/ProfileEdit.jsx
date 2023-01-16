import React from 'react';
/* import PropTypes from 'prop-types'; */
import Header from '../components/Header';
/* import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI'; */

class ProfileEdit extends React.Component {
  /* state = {
    name: '',
    email: '',
    bio: '',
    imagem: '',
    carregando: true,
    desabilitado: true,
  };

  async componentDidMount() {
    const user = await getUser();

    this.setState({
      name: user.name,
      email: user.email || '',
      imagem: user.image || '',
      bio: user.description || '',
    }, () => {
      this.carregaEstado();
      this.validaConteudo();
    });
  }

  aguardaConteudo = ({ target }) => {
    const { name, value } = target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }
    ), () => this.validaConteudo());
  };

  validaConteudo = () => {
    const {
      name,
      email,
      imagem,
      bio,
    } = this.state;

    console.log(name, email, imagem, bio);
    const number = 3;

    if ([name.length, email.length, imagem.length, bio.length]
      .some((valor) => valor < number)
      || (!email.includes('@') && (!email.includes('.com')))) {
      return this.setState({
        desabilitado: true,
      });
    } this.setState({
      desabilitado: false,
    });
  };

  salvaConteudo = async (event) => {
    const { name, email, imagem, bio } = this.state;
    const { history } = this.props;

    event.preventDefault();

    await updateUser({ name, email, imagem, bio });
    history.push('/profile');
  };

  carregaEstado = () => this.setState(({ loading }) => ({ carregando: !loading }));
 */
  render() {
    /* const {
      carregando,
      name,
      email,
      imagem,
      bio,
      desabilitado } = this.state; */

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {/* <Header />
        {carregando ? <Loading /> : (
          <form onSubmit={ this.onClick }>

            <div>

              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.aguardaConteudo }
              />

              <input
                data-testid="edit-input-email"
                type="email"
                name="email"
                value={ email }
                onChange={ this.aguardaConteudo }
                placeholder={ `${name.toLowerCase()}@email.com` }
              />

              <textarea
                data-testid="edit-input-bio"
                cols="30"
                rows="1"
                name="bio"
                value={ bio }
                onChange={ this.aguardaConteudo }
                placeholder={ `Eu sou o ${name}. Amo escutar músicas nesse site!` }
              />

              <input
                data-testid="edit-input-imagem"
                type="url"
                name="imagem"
                value={ imagem }
                onChange={ this.aguardaConteudo }
              />
            </div>

            <button
              data-testid="edit-button-save"
              type="submit"
              onClick={ this.salvaConteudo }
              disabled={ desabilitado }
            >
              Editar perfil
            </button>

          </form>
        )}
 */}
      </div>
    );
  }
}

/* ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}; */

export default ProfileEdit;
