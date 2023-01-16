import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() { // usando constructor após entender corretamente realizando projeto Online Store
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      carregando: true,
      isSaveButtonDisabled: true,
    };
  }

  async componentDidMount() {
    const usuario = await getUser();

    this.setState({
      name: usuario.name,
      email: usuario.email || '',
      image: usuario.image || '',
      description: usuario.description || '',
    }, () => {
      this.aguardaEstado();
      this.validacaoEmail();
    });
  }

  onChange = ({ target }) => { // pega os valores e seta o estado anterior, porém só faz isso depois de validar o email
    const { name, value } = target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }
    ), () => this.validacaoEmail());
  };

  validacaoEmail = () => { // funcao para validar email
    const {
      name,
      email,
      image,
      description,
    } = this.state;
    console.log(name, email, image, description);

    const number = 3;

    if (
      [
        name.length,
        email.length,
        image.length,
        description.length,
      ]
        .some((param) => param < number)
      || (!email.includes('@') && (!email.includes('.com')))) {
      return this.setState({
        isSaveButtonDisabled: true,
      });
    } this.setState({
      isSaveButtonDisabled: false,
    });
  };

  validaClick = async (event) => { // funcao para não atualizar os dados até clicar no batão
    const { name, email, image, description } = this.state;

    event.preventDefault();

    await updateUser({ name, email, image, description });

    const { history } = this.props; // dica de aula ao vivo ciclo de vida de componentes
    history.push('/profile');
  };

  aguardaEstado = () => this.setState(({ loading }) => ({ carregando: !loading }));

  render() {
    const {
      name,
      email,
      image,
      description,
      carregando,
      isSaveButtonDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {carregando ? <Loading /> : (
          <form onSubmit={ this.onClick }>
            <div className="edit-profile-form">
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.onChange }
              />
              <input
                data-testid="edit-input-email"
                type="email"
                name="email"
                value={ email }
                onChange={ this.onChange }
                placeholder={ `${name.toLowerCase()}@email.com` } // mantém todas letras em minúscula
              />
              <textarea
                data-testid="edit-input-description"
                cols="30"
                rows="1"
                name="description"
                value={ description }
                onChange={ this.onChange }
                placeholder={ `${name}` }
              />
              <input
                data-testid="edit-input-image"
                type="url"
                name="image"
                value={ image }
                onChange={ this.onChange }
              />
            </div>
            <button
              data-testid="edit-button-save"
              id="save-edtProfile-btn"
              type="submit"
              onClick={ this.validaClick }
              disabled={ isSaveButtonDisabled }
            >
              Editar perfil
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({ // dica: https://dev.to/cesareferrari/how-to-specify-the-shape-of-an-object-with-proptypes-3c56
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
