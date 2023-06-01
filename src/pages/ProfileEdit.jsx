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
      loading: true,
      isSaveButtonDisabled: true,
    };
  }

  async componentDidMount() {
    const usuario = await getUser(); // É feita a requisição para getUser para recuperar as informações da pessoa logada;

    this.setState({ // O formulário é renderizado já preenchido com as informações da pessoa logada;
      name: usuario.name,
      email: usuario.email || '',
      image: usuario.image || '',
      description: usuario.description || '',
    }, () => {
      this.aguardaEstado();
      this.validacaoEmail();
    });
  }

  onChange = ({ target }) => { // É possível alterar os valores dos campos;
    const { name, value } = target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }
    ), () => this.validacaoEmail());
  };

  validacaoEmail = () => { // O botão salvar é habilitado somente se todos os campos estiverem válidos;
    const {
      name,
      email,
      image,
      description,
    } = this.state;
    const number = 3;

    console.log(name, email, image, description);

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
    const {
      name,
      email,
      image,
      description } = this.state;

    event.preventDefault();

    await updateUser({ name, email, image, description }); // As informações são enviadas usando a API updateUser;

    const { history } = this.props; // dica de aula ao vivo ciclo de vida de componentes
    history.push('/profile'); // Após salvar as informações a pessoa é redirecionada para a página de exibição de perfil.
  };

  aguardaEstado = () => this.setState(({ loading }) => ({ loading: !loading }));

  render() {
    const {
      name,
      email,
      image,
      description,
      loading,
      isSaveButtonDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form onSubmit={ this.onClick }>
            <div>
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.onChange }
              />
              <input
                type="email"
                data-testid="edit-input-email"
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
                placeholder={ `Olá, ${name}! Descreva-se brevemente.` }
              />
              <input
                type="url"
                data-testid="edit-input-image"
                name="image"
                value={ image }
                onChange={ this.onChange }
              />
            </div>
            <button
              type="submit"
              data-testid="edit-button-save"
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
