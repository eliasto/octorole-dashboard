import React, { useState } from 'react';
import {sitepath} from '../config.json'
function Logged() {

    const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));
    const redirectURI = sitepath+'/connect/discord';

    if(!isLogged){
      return(
          window.location.href = redirectURI
      );
  }else {
      return <div></div>
  }
  
}

export default Logged;