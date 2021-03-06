import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import {apipath, sitepath} from '../config.json';
import { InformationCircleIcon, CalendarIcon, CurrencyEuroIcon, CheckCircleIcon  } from '@heroicons/react/solid'
import {PayPalButton} from 'react-paypal-button-v2';
import {strings} from '../translations/lang';

function Product() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [discord, setDiscord] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [, setValue] = useState();

    const location = useLocation();
    const id = location.pathname.split('/')[2];  

    var lang;

    if(strings._language === 'fr'){
      lang = 'en';
    } else {
      lang = 'fr';
    }

    function reload(){
      localStorage.setItem('lang', lang);
      strings.setLanguage(localStorage.getItem('lang'));
      setValue({})
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
              if(res.data.server.paypal == null){
                window.location.href = sitepath;
              }
            }).catch(e =>{
              window.location.href = sitepath;
            })
        };    
        fetchDatas();   
        if(localStorage.getItem('discord_client_id') != null && localStorage.getItem('discord_client_name')){
          setDiscord(true);
          localStorage.removeItem('productId');
        } 
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
              {(loading)?<div className="flex bg-gray-900 h-screen"><div className="m-auto"><svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div></div>:
        <div className="bg-gray-900 absolute top-1/2 px-5 -translate-y-1/2 xs:top-1/2 xs:left-1/2 transform xs:-translate-x-1/2 xs:-translate-y-1/2">
        <div className="max-w-md py-4 m-auto px-8 bg-white shadow-lg rounded-lg">

  <div className="flex justify-center -mt-16">
    <span className="bg-purple-600 w-20 h-20 text-center rounded-full text-4xl border-4 border-white py-3 m-auto">{data.emoji}</span>
  </div>
  <div>
    {orderId?
  <div className="max-w-md m-auto mb-30">
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-lg text-green-900 font-bold">
          {strings.shop.product['transaction-confirm-title']}
          </p>
          <p className="text-sm text-green-700">
          {strings.formatString(strings.shop.product['transaction-confirm-body'], {orderId:<span className="font-bold">{orderId}</span>, clickHere: <a className="text-green-900" href="https://doc.octorole.xyz">{strings.shop.product['transaction-confirm-clickhere']}</a>})}
          </p>
        </div>
      </div>
    </div>
    </div>:null}
    <h2 className="text-gray-800 text-3xl font-semibold text-center">{data.name}</h2>
    <p className="mt-2 text-gray-600">{data.description}</p>
    <hr></hr>
    <div className="mt-3">
      <div><InformationCircleIcon className="w-5 h-5 inline-block mr-1"/>{strings.formatString(strings.shop.product.type, {type:<span className="font-bold">{data.type}</span>})}</div>
      <div><CalendarIcon className="w-5 h-5 inline-block mr-1"/>{strings.formatString(strings.shop.product.time, {days:<span className="font-bold">{data.day}</span>})}</div>
      <div><CurrencyEuroIcon className="w-5 h-5 inline-block mr-1"/>{strings.formatString(strings.shop.product.price, {price:<span className="font-bold">{data.price}</span>})}</div>
    </div>
    <div className="mt-5 text-center text-xs">
      {discord?<PayPalButton
        createOrder={(datas, actions) => {
          return actions.order.create({
              purchase_units: [{
                description: `OCTOROLE - PAYMENT TO ${data.server.name} FOR ${data.name} TO DISCORD CLIENT ID ${localStorage.getItem('discord_client_id')}`,
                reference_id: `${data.server.guildId}_${localStorage.getItem('discord_client_id')}_${new Date().getTime()}_${data.id}_${localStorage.getItem('discord_client_name')}`,
                  amount: {
                    currency_code: "EUR",
                    value: data.price
                  },
                  payee: {
                    email_address: data.server.paypal
                  }
              }],
              application_context: {
                 shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
               }
          });
      }}
      onApprove={(data, actions) => {
          return actions.order.capture().then(function(details) {
            console.log(details)
              setOrderId(details.id);
          });
      }}
      options={{
        currency: "EUR",
        clientId: "AUVOEibtOwN16L0UBeS--KGFNXuYi1gEKHa6zO3fSO-sjd8e9i5vbxSZJ_wfcbTJkLaz6o9buyvDrrC3"
      }}
      onButtonReady={() => {}}
      />:<button
        onClick={() => connectDiscord()}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        {strings.shop.product.login}
      </button>}
      <button 
      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-purple-600 border-purple-600 bg-white-600 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      onClick={()=>reload()} type="button">{strings.miscellaneous.lang}</button>

      <p className="mt-4">{strings.formatString(strings.shop.product.server, {server: data.server.name, id: data.server.guildId})}</p>
    </div>
  </div>
</div>
        <div>
        {discord?<div><p className="text-center text-white text-sm">{strings.formatString(strings.shop.product.account, {discord: <span className="font-bold">{localStorage.getItem('discord_client_name')}</span>})}</p><p className="text-center text-white text-sm">          {strings.formatString(strings.shop.product.logout, {clickHere: <Link className="text-purple-300" onClick={() => disconnect()}>{strings.shop.product.link}</Link> })}.</p></div>:null}
          </div>
</div>}
      </div>
    );
    
  }
  
  export default Product;