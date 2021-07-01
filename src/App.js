import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useLocation, Redirect
} from 'react-router-dom';

import './css/style.scss';

import { focusHandling } from 'cruip-js-toolkit';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Products from './pages/Products';
import Settings from './pages/Settings';
import Callback from './auth/callback'
import Logged from './pages/Logged';
import Guilds from './auth/guilds';

function App() {

  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  if(location.pathname === '/'){
    return <Redirect to="/dashboard" />
  }
  if(!isLogged && location.pathname !== '/auth/callback' && location.pathname.split('/')[1] === 'dashboard'){
    return <Logged />;
  }
  else if(localStorage.getItem('guildId') == null && location.pathname !== '/auth/guilds' && isLogged){
    return(
      window.location.href="/auth/guilds"
    );
  }else{

  return (
      <Switch>
            <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/dashboard/transactions">
          <Transactions />
        </Route>
        <Route exact path="/dashboard/products">
          <Products />
        </Route>
        <Route exact path="/dashboard/settings">
          <Settings />
        </Route> 
        <Route exact path="/auth/callback">
          <Callback />
        </Route>   
        <Route exact path="/auth/guilds">
          <Guilds />
        </Route>

      </Switch>
  );
  }
}

export default App;
