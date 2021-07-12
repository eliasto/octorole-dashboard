/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {apipath} from '../config.json';
import {strings} from '../translations/lang';

class Guilds extends React.Component {

  constructor(props) {
    super(props);
    if(localStorage.getItem('jwt') == null){
        window.location.href = "/dashboard";
    }
    this.state = { items: [], loading: true, blocked: false };
}


async checkServer(id, name){
  if(this.state.blocked === false){
    this.setState(() =>{
      return{
          blocked: true,
      }
  })
  await fetch(`${apipath}/servers/guild/`+id, {
    method: 'get', 
headers: new Headers({
 'Content-Type': 'application/x-www-form-urlencoded'
}), 
})
  .then(res => {
    if (res.status !== 200) {
      throw new Error(`Couldn't fetch Strapi api. Status: ${res.status}`);
    }
    return res;
  })
  .then(res => res.json())
  .then(async res => {
    if(res === false){
      await fetch(`${apipath}/servers/`, {
        method: 'post', 
   headers: new Headers({
     'Authorization': 'Bearer '+localStorage.getItem('jwt'), 
     'Accept': 'application/json',
     'Content-Type': 'application/json'
  }), 
   body: JSON.stringify({
     'guildId': id,
     'discordToken': localStorage.getItem('discord_token')
   })
    })
      .then(res => {
        if (res.status !== 200) {  
          throw new Error(`Couldn't fetch Strapi api. Status: ${res.status}`);
          
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    } 
  })
  .catch(err => {
    console.log(err);
  });

  localStorage.setItem('guildId', id);
  localStorage.setItem('guildName', name);
  window.location.href = '/dashboard';
  }
}
  
componentDidMount() {


    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(`https://discord.com/api/users/@me/guilds`, {
        method: 'get', 
   headers: new Headers({
     'Authorization': 'Bearer '+localStorage.getItem('discord_token'), 
     'Content-Type': 'application/x-www-form-urlencoded'
   }), 
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't fetch discord api. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        // Redirect to homepage after 3 sec
        this.setState(() => {
            return {
                items: res,
                loading: false,
                blocked: false,
            };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState(() =>{
            return{
                items: 'An error occurred, please see the developer console.'
            }
        })
      });
  }

render(){
  return (
    <div>
  <div className="flex h-screen justify-center items-center">
    <div className="text-center bg-white p-10 rounded-lg shadow-lg">
    <h1 className="font-bold mb-2 text-indigo-600 text-xl">{strings.auth.guilds.title} < br/>{strings.auth.guilds.subtitle}</h1>
    {(this.state.loading? <p>{strings.auth.guilds.loading}</p>: null)}
    { 
    // eslint-disable-next-line array-callback-return
    this.state.items.map((item) => {
        if(item.owner === true){
                return (
                    <div className="flex justify-between p-3 items-center">
                        <div className="flex flex-wrap justify-start items-center">
                            <img src={'https://cdn.discordapp.com/icons/'+item.id+'/'+item.icon+'.png'} className="w-10 h-10 inline-block align-middle rounded-full mr-2"></img>
                            <p className="truncate-flex max-w-xs mx-auto text-xs truncate mr-2">{item.name}</p>
                        </div>
                        <button
        type="button"
        onClick={() => {
            this.checkServer(item.id, item.name);
                }}
        className="items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
      >
        {(this.state.blocked)?   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
}
       
      </button>
                    </div>
                );
            }}) }  
    </div>
    </div>
    <div className="absolute inset-x-0 bottom-0 h-10">
      <center>
      {/*<img src={logo} className="w-10 h-10"></img>*/}
      </center>
      </div>
      </div>
      )}
};

export default Guilds;
