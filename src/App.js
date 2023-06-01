import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              component={ Login }
            />
            <Route
              exact
              path="/search"
              component={ Search }
            />
            <Route
              exact
              path="/album/:id"
              component={ Album }
            />
            <Route
              exact
              path="/favorites"
              component={ Favorites }
            />
            <Route
              exact
              path="/profile"
              component={ Profile }
            />
            <Route
              exact
              path="/profile/edit"
              component={ ProfileEdit }
            />
            <Route
              component={ NotFound }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;

/* O que será verificado

A rota / é uma rota existente e que renderiza um componente com o data-testid com valor page-login;

A rota /search é uma rota existente e que renderiza um componente com o data-testid com valor page-search;

A rota /album/:id é uma rota existente e que renderiza um componente com o data-testid com valor page-album;

A rota /favorites é uma rota existente e que renderiza um componente com o data-testid com valor page-favorites;

A rota /profile é uma rota existente e que renderiza um componente com o data-testid com valor page-profile;

A rota /profile/edit é uma rota existente e que renderiza um componente com o data-testid com valor page-profile-edit;

Existe uma página para rotas não mapeadas e que renderiza um componente com o data-testid com valor page-not-found;
 */
