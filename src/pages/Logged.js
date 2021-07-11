import React, { useState } from 'react';
import {apipath} from '../config.json'
function Logged() {

    const [isLogged] = useState(!!localStorage.getItem('jwt'));
    const redirectURI = apipath+'/connect/discord';

    if(!isLogged){
      return(
          window.location.href = redirectURI
      );
  }else {
      return <div></div>
  }
  
}

export default Logged;