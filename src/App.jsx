import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Header from './components/Header';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    userName: '',
    nomeValido: false,
    carregando: false,
    logado: false,
  };

  componentDidMount() {
    const pesquisa = localStorage.getItem('user');
    this.setState({ logado: pesquisa });
  }

  enviando = (event) => {
    event.preventDefault();

    this.setState({ carregando: true }, async () => {
      const { userName } = this.state;
      await createUser({ name: userName });

      this.setState({ carregando: false, logado: true });
    });
  };

  validaNome = () => {
    const { userName } = this.state;
    const number = 3;
    const romeu = userName.length >= number;

    this.setState({ nomeValido: romeu });
  };

  alteraInput = ({ target }) => {
    const state = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [state]: value,
    }, () => {
      this.validaNome();
    });
  };

  render() {
    const {
      userName,
      nomeValido,
      carregando,
      logado,
    } = this.state;

    return (
      <div>
        <BrowserRouter>
          {logado && <Header />}
          <main>
            <Switch>
              <Route
                exact
                path="/"
              >
                { logado ? <Redirect to="/search" /> : (
                  <Login
                    userName={ userName }
                    alteraInput={ this.alteraInput }
                    nomeValido={ nomeValido }
                    createUser={ this.enviando }
                    carregando={ carregando }
                  />)}
              </Route>
              <Route exact path="/search" render={ () => <Search /> } />
              <Route
                exact
                path="/album/:id"
                render={ (props) => <Album { ...props } /> }
              />
              <Route exact path="/favorites" render={ () => <Favorites /> } />
              <Route exact path="/profile" render={ () => <Profile /> } />
              <Route exact path="/profile/edit" render={ () => <ProfileEdit /> } />
              <Route path="*" render={ () => <NotFound /> } />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
