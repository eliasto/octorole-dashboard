import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import {apipath} from '../config.json';
import { InformationCircleIcon, CalendarIcon, CurrencyEuroIcon  } from '@heroicons/react/solid'

function Product() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [discord, setDiscord] = useState(false);

    const location = useLocation();
    const id = location.pathname.split('/')[2];  

    if(localStorage.getItem('discord_client_id') != null && localStorage.getItem('discord_client_name')){
      setDiscord(true);
      localStorage.removeItem('productId');
    }

    useEffect(() => {
        const fetchDatas = async () => {
          await axios.get(`${apipath}/products/info/${id}`, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }})
            .then(res => {
              const datas = res.data;
              setData(datas);     
              setLoading(false);
            }).catch(e =>{
              window.location.href = 'https://octorole.xyz';
            })
        };    
        fetchDatas();    
    }, [id]);

    function connectDiscord(){
      localStorage.setItem('productId', id);
      window.location.href = apipath+'/connect/discord';
    }

    function disconnect(){
      localStorage.removeItem('discord_client_id');
      localStorage.removeItem('discord_client_name');
      setDiscord(false);
    }

    return (
      <div className="bg-gray-900 h-screen relative">
              {(loading)?<div className="flex bg-gray-900 h-screen"><div className="m-auto"><svg class="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div></div>:
        <div className="bg-gray-900 absolute top-1/2 px-5 -translate-y-1/2 xs:top-1/2 xs:left-1/2 transform xs:-translate-x-1/2 xs:-translate-y-1/2">
        <div class="max-w-md py-4 m-auto px-8 bg-white shadow-lg rounded-lg">
  <div class="flex justify-center -mt-16">
    <img class="w-20 h-20 object-cover rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"></img>
  </div>
  <div>
    <h2 class="text-gray-800 text-3xl font-semibold text-center">{data.name}</h2>
    <p class="mt-2 text-gray-600">{data.description}</p>
    <hr></hr>
    <div className="mt-3">
      <div><InformationCircleIcon className="w-5 h-5 inline-block mr-1"/> Ce produit est <span className="font-bold"> {data.type}</span>.</div>
      <div><CalendarIcon className="w-5 h-5 inline-block mr-1"/> Votre rôle vous sera retiré au bout de <span className="font-bold"> {data.day} jours</span>.</div>
      <div><CurrencyEuroIcon className="w-5 h-5 inline-block mr-1"/> Vous serez débité de <span className="font-bold"> {data.price} €</span> pour ce rôle.</div>
    </div>
    <div className="mt-5 text-center text-xs">
      {discord?<button
        onClick={() => console.log('hey')}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Payer avec le compte Discord <span className="font-bold ml-1">{localStorage.getItem('discord_client_name')}</span>
      </button>:<button
        onClick={() => connectDiscord()}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Se connecter à mon compte Discord
      </button>}
      <p className="mt-4">Vous êtes sur la fiche produit du serveur {data.server.name} (id: {data.server.guildId}).</p>
    </div>
  </div>
</div>
        <div>
          {discord?<div><p className="text-center text-white text-sm">Vous êtes connecté sur le compte Discord {localStorage.getItem('discord_client_name')}.</p><p className="text-center text-white text-sm">Pour vous déconnecter, <Link className="text-purple-300" onClick={() => disconnect()}> cliquez-ici.</Link></p></div>:null}
          </div>
</div>}
      </div>
    );
    
  }
  
  export default Product;