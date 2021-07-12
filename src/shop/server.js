import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../images/logo-transparent.png'
import axios from "axios";
import {apipath} from '../config.json'
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import {strings} from '../translations/lang'

function Server() {
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const [loading, setLoading] = useState(true);
    const [banner, setBanner] = useState(true);
    const [data, setData] = useState(null);
    const [highlighted, setHighlighted] = useState([]);

    useEffect(() => {
        const fetchDatas = async () => {
          await axios.get(`${apipath}/servers/shop/${id}`, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }})
            .then(res => {
              const datas = res.data
              setData(datas);
              var highlight = [];
        for(let i in res.data.products){
            if(res.data.products[i].highlight === true){
                highlight.push(res.data.products[i]);
            }
        }
        setHighlighted(highlight);
              setLoading(false);

            }).catch(e =>{
              window.location.href = 'https://octorole.xyz';
            })
        };    
        fetchDatas();
    }, [id]);


 
      
      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
  
    return (
      <div>
                  {(!loading)?
          <main className="bg-gray-900 h-screen">
          <nav
                  className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 p-5"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-1">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <span className="sr-only">octorole</span>
                        <img
                          className="h-8 w-auto sm:h-10"
                          src={logo}
                          alt="logo d'octorole"
                        />
                    </div>
                    
                  </div>
                  <div className="md:flex md:items-center md:space-x-6">
                    <Link to="/"
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                    >
                      {strings.shop.server.return}
                    </Link>
                  </div>
                </nav>
                <div className="text-white pt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="bg-purple-500 p-2 object-center rounded-full w-12 h-12 block m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
</svg>
                    <h1 className="text-3xl font-bold text-center">{strings.formatString(strings.shop.server.title, {server: data.name})}</h1>
                    <p className="text-xl text-center">{data.description}</p>
                </div>

                <div className="bg-gray-900 overflow-hidden">
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {highlighted.length > 0?
        <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8 mb-10">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {strings.shop.server.highlights}
            </h2>
          </div>
          <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
                {highlighted.map(prod => (
                    <div key={prod.id}>
                    <dt>
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white text-2xl">
                        {prod.emoji}
                      </div>
                      <p className="mt-5 text-2xl leading-6 font-medium text-white">{prod.price} €</p>
                      <p className="mt-5 text-lg leading-6 font-medium text-white">{prod.title}</p>
                    </dt>
                    <dd className="mt-2 text-base text-gray-300">{prod.description}</dd>
                    <Link to={"/product/"+prod.id}
                          href="#"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 mt-2"
                        >
                          {strings.shop.server.buy}
                        </Link>
                  </div>
             
                )
                    
                )}
                 </dl>
            </div>:null}
              

        <h1 className="text-2xl font-bold text-center text-white p-10">{highlighted.length >0?strings.shop.server.products: strings.shop.server.product}</h1>
        <div className="rounded-lg bg-gray-800 overflow-hidden shadow divide-y divide-gray-800 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
            {(data.products.length > 0)?
      data.products.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            actionIdx === data.products.length - 2 ? 'sm:rounded-bl-lg' : '',
            actionIdx === data.products.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
            'relative group bg-gray-700 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-500'
          )}
        >
            <Link to={"/product/"+action.id}>
          <div>
            <span
              className=
                'rounded-lg inline-flex p-3 ring-4 ring-purple-500 bg-purple-400 text-xl'
            >
                
              {action.emoji}
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium text-white">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {action.name}
            </h3>
            <p className="mt-2 text-sm text-gray-300">
              {action.description}
            </p>
          </div>
          <span
            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
          <span className="text-xl font-bold absolute bottom-0 right-0 p-5 text-white">{action.price} €</span>
          </Link>
        </div>
      )):<p className="text-center text-white">{strings.shop.server.null}</p>}
    </div>


      </div>
      {(banner && data.bannerState)?
      <div className="fixed inset-x-0 bottom-0">
        <div className="bg-purple-600">
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-purple-800">
                  <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span className="md:hidden">{data.bannerMessage}</span>
                  <span className="hidden md:inline">{data.bannerMessage}</span>
                </p>
              </div>
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a
                  href={data.bannerLink}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-purple-600 bg-white hover:bg-purple-50"
                >
                  {data.bannerLinkText}
                </a>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                <button
                  onClick={() => setBanner(false)}
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                >
                  <span className="sr-only">{strings.shop.server.close}</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>:null}
    </div>
          </main>:<div className="flex bg-gray-900 h-screen"><div className="m-auto"><svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div></div>}
      </div>
    );
    
  }
  
  export default Server;