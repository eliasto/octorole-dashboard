/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";
import logo from '../images/logo-without-text.png'
import {apipath, sitepath} from '../config.json'

const Auth = (props) => {
  const [text, setText] = useState('Chargement...');
  const location = useLocation();
  const params = useParams();
  const history = useHistory();
  const parameters = new URLSearchParams(location.search);

  useEffect(() => {
    localStorage.setItem('discord_client_token', parameters.get('access_token'))
        fetch(`https://discord.com/api/users/@me`,{
          method: 'get', 
     headers: new Headers({
       'Authorization': 'Bearer '+localStorage.getItem('discord_client_token'), 
       'Content-Type': 'application/x-www-form-urlencoded',
        })
      })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Discord. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
          localStorage.setItem('discord_id', res.id);
          localStorage.setItem('discord_avatar', res.avatar);
          localStorage.setItem('discord_client_name', res.username+'#'+res.identifier);
          setText('Vous êtes désormais connecté. Redirection dans quelques secondes...');
          setTimeout(() => window.location.href = sitepath+'/product/'+localStorage.getItem('productId'), 3000); // Redirect to homepage after 3 sec  
      })
      .catch(err => {
        console.log(err);
        setText('Une erreur vient de se produire. Veuillez vérifier la console de développement.')
      })
      .catch(err => {
        console.log(err);
        setText('Une erreur vient de se produire. Veuillez vérifier la console de développement.')
      });
  }, [history, location.search, params.providerName]);

  return (
    <div>
  <div className="flex h-screen justify-center items-center bg-gray-900">
    <p className="text-center bg-white p-5 rounded-lg shadow-lg">{text}</p>
    </div>
    <div className="absolute inset-x-0 bottom-0 h-40">
      <center>
      <img src={logo} className="w-40 h-40"></img>
      </center>
      </div>
      </div>)
};

export default Auth;
