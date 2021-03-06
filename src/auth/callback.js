/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";
import {apipath, sitepath} from '../config.json';
import {strings} from '../translations/lang';

const Callback = (props) => {
  const [text, setText] = useState(strings.auth.login.loading);
  const location = useLocation();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const parameters = new URLSearchParams(location.search);
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(`${apipath}/auth/discord/callback${location.search}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        if(localStorage.getItem('productId') == null){
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        }
        localStorage.setItem('discord_token', parameters.get('access_token'))
        fetch(`https://discord.com/api/users/@me`,{
          method: 'get', 
     headers: new Headers({
       'Authorization': 'Bearer '+localStorage.getItem('discord_token'), 
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
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
          if(localStorage.getItem('productId') != null){
            localStorage.setItem('discord_client_name', res.username+'#'+res.discriminator);
            localStorage.setItem('discord_client_id', res.id);
            localStorage.removeItem('discord_token');
            setText(strings.auth.login.success);  
            setTimeout(() => window.location.href = sitepath+'/product/'+localStorage.getItem('productId'), 3000); // Redirect to homepage after 3 sec   
          }else{
            localStorage.setItem('discord_id', res.id);
            localStorage.setItem('discord_avatar', res.avatar);
            setText(strings.auth.login.success);  
          setTimeout(() => window.location.href = sitepath+'/dashboard', 3000); // Redirect to homepage after 3 sec 
          } 
      })
      .catch(err => {
        console.log(err);
        setText(strings.auth.login.error);
      })
      })
      .catch(err => {
        console.log(err);
        setText(strings.auth.login.error)
      });
  }, [history, location.search, params.providerName]);

  return (
    <div>
  <div className="flex h-screen bg-gray-900 justify-center items-center">
    <p className="text-center bg-white p-5 rounded-lg shadow-lg">{text}</p>
    </div>
    <div className="absolute inset-x-0 bottom-0 h-40">
      <center>
      {/*<img src={logo} className="w-40 h-40"></img>*/}
      </center>
      </div>
      </div>)
};

export default Callback;
