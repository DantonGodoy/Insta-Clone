import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import New from './pages/New';

function Routes () {
  return (
    <Switch>
      <Route path="/" exact component={Feed} />
      <Route path="/new" component={New} />
    </Switch>
  )
};

export default Routes;

/**
 * Caso o Switch estivesse omitido/ausente, quando o usuário acessar por exemplo /new/test, ambas as rotas seriam entregues, pois ambas contêm o caractére '/'. Não é esse comportamento que buscamos, portanto o Switch assume a responsibilidade em rotear a aplicação de forma mais inteligente.
 */