import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function Logged() {

    const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));

    const redirectURI = 'https://api.octorole.eliasto.me/connect/discord';

    if(!isLogged){
      return(
          window.location.href = redirectURI
      );
  }else {
      return <div></div>
  }
  
}

export default Logged;