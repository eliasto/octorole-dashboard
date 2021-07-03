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
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Transactions = React.lazy(() => import('./pages/Transactions'));
const Products = React.lazy(() => import('./pages/Products'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Invite = React.lazy(() => import('./pages/Invite'));
const Home = React.lazy(() => import('./pages/Front'));
const Logged = React.lazy(() => import('./pages/Logged'));
const Guilds = React.lazy(() => import('./auth/guilds'));
const Callback = React.lazy(() => import('./auth/callback'));



function App() {

  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

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
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/invite">
          <Invite />
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
