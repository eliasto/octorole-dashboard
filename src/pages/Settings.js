import React, { useState, Fragment,useRef, useEffect } from 'react';
import { Transition, Dialog } from '@headlessui/react'
import {  XIcon } from '@heroicons/react/solid'
import { ExclamationIcon,CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
import axios from 'axios';
import {apipath} from '../config.json'

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const { toast } = require('tailwind-toast')

function Settings() {
  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false);
  const [paypalData, setPaypal] = useState(null);
  const [isPaypalLoading, setIsPaypalLoading] = useState(false);
  const [paypalPlaceholder, setPaypalPlaceholder] = useState('paypal@octorole.xyz');
  const [id, setId] = useState(null);
  const [notification, setNotification] = useState([]);
  const [description, setDescription] = useState(null);
  const [bannerLink, setBannerLink] = useState(null);
  const [bannerMessage, setBannerMessage] = useState(null);
  const [isShopDataLoading, setIsShopDataLoading] = useState(false);
  const [bannerState, setBannerState] = useState(false);



  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() =>{
    const getPaypal = async () => {
      await axios.get(`${apipath}/servers?guildId=${localStorage.getItem('guildId')}` ,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then((response) => {
          if(response.data[0].paypal != null){
            setPaypalPlaceholder(response.data[0].paypal);
          }
          setDescription(response.data[0].description);
          setBannerMessage(response.data[0].bannerMessage);
          setBannerLink(response.data[0].bannerLink);
          setBannerState(response.data[0].bannerState);
          setId(response.data[0].id)
        }).catch(e =>{
          console.log(e);
        })
    }
    getPaypal();
}, []);

function showNotification(type, name, description){
  setNotification(<>
    {/* Global notification live region, render this permanently at the end of the document */}
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none p-6 items-start"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={true}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {type === 'success'?<CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />:<ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{name}</p>
                  <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      setNotification();
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </>);
  setTimeout(function(){ setNotification(); }, 3000);
}

async function ChangeShopData(){
  setIsShopDataLoading(true);
        await axios.put(`${apipath}/servers/${id}`,{
          bannerState: bannerState,
          bannerMessage: bannerMessage,
          bannerLink: bannerLink,
          description: description
        } ,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            }})
            .then(res => {
              if(res.status === 200){
                setIsShopDataLoading(false);
                showNotification("success", "Changement appliqué", `Votre page a bien été modifié !`);
                toast().success('Changement appliqué', `Votre page a bien été modifié !`).for(3000).show() //display for 3000ms
              }
            }).catch(e =>{
              setIsShopDataLoading(false);
              showNotification("error", "Une erreur est survenue", `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`);
              toast().danger('Une erreur est survenue', `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`).for(6000).show() //display for 3000ms
              console.log(e);
            })
      }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/*
          <div className="rounded-md bg-blue-100 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">Changer le canal d'annonce d'achat.</h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              Vous pouvez ici définir le canal sur votre serveur où seront envoyé les achats effectuées par les membres de votre serveur. Pour désactiver l'option, il suffit juste de sélectionner "désactiver".
            </p>
          </div>
        </div>
            </div>*/}
        {/* Modifier le shop */}
        <div className="bg-white shadow sm:rounded-lg mb-5">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Modifier la page de ma boutique</h3>
        <div className="mt-2 text-sm text-gray-500">
          <p>Modifier ici la page de votre boutique pour la rendre unique comme votre serveur !</p>
        </div>
        <div className="mt-5">
        <div className="mb-3">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <div className="mt-1">
        <input
          onChange={e =>{setDescription(e.target.value)}}
          type="text"
          name="description"
          id="description"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={description}
        />
      </div>
    </div>
    <div className="mb-3">
      <label htmlFor="bannerMessage" className="block text-sm font-medium text-gray-700">
        Message de la bannière
      </label>
      <div className="mt-1">
        <input
                onChange={e =>{setBannerMessage(e.target.value)}}
          type="text"
          name="bannerMessage"
          id="bannerMessage"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={bannerMessage}
        />
      </div>
    </div>
    <div className="mb-3">
      <label htmlFor="bannerLink" className="block text-sm font-medium text-gray-700">
        Lien de la bannière
      </label>
      <div className="mt-1">
        <input
        onChange={e =>{setBannerLink(e.target.value)}}
          type="text"
          name="bannerLink"
          id="bannerLink"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={bannerLink}
        />
      </div>
    </div>
    <Switch.Group as="div" className="flex items-center justify-between mb-3">
      <Switch.Label as="span" className="flex-grow flex flex-col" passive>
        <span className="text-sm font-medium text-gray-900">Activer la bannière</span>
        <span className="text-sm text-gray-500">Permet d'afficher une bannière personnalisé sur la page de votre boutique.</span>
      </Switch.Label>
      <Switch
        checked={bannerState}
        onChange={setBannerState}
        className={classNames(
          bannerState ? 'bg-blue-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        )}
      >
        <span className="sr-only">Activer la bannière</span>
        <span
          aria-hidden="true"
          className={classNames(
            bannerState ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
    </Switch.Group>
          <button
            onClick={()=>ChangeShopData()}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            {isShopDataLoading?<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>: "Confirmer"}
          </button>
        </div>
      </div>
    </div>

            {/*Ajouter paypla */}
            <div className="bg-white shadow sm:rounded-lg mb-5">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Ajouter mon adresse Paypal</h3>
        <div className="mt-2 text-sm text-gray-500">
          <p>Rentrez ci-dessous votre adresse Paypal Business pour recevoir vos paiement effectués sur octorole !</p>
        </div>
        <div className="mt-5">
        <div className="mb-3">
      <label htmlFor="paypal" className="sr-only">
        Paypal
      </label>
      <input
        onChange={(e) => setPaypal(e.target.value)}
        type="text"
        name="paypal"
        id="paypal"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder={paypalPlaceholder}
      />
    </div>
          <button
            onClick={()=>ChangePaypal(paypalData)}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            {isPaypalLoading?<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>: "Confirmer"}
          </button>
        </div>
      </div>
    </div>

{/* Alerte suppression */}
          <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Supprimer le serveur d'octorole</h3>
        <div className="mt-2 text-sm text-gray-500">
          <p>Une fois le serveur supprimé, il sera impossible de récupérer les transactions, produits et autres informations. {/*Si besoin, veillez à exporter toutes les transactions depuis l'onglet "Transaction" puis "Exporter".*/}</p>
        </div>
        <div className="mt-5">
          <button
            onClick={()=>setOpen(!open)}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Supprimer le serveur d'octorole
          </button>
        </div>
      </div>
    </div>
    <span className="font-light text-xs">octorole - guildId: {localStorage.getItem('guildId')} - userId: {localStorage.getItem('discord_id')} - v.1.0.0</span>
          </div>
        </main>
      </div>
      {/* Delete modal */}

      <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Supprimer <strong>{localStorage.getItem('guildName')}</strong> d'octorole
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Attention, cette action est irréverssible. Toute suppression entraînera la suppression de toutes les données associées à ce serveur. En êtes-vous sûr ?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {setIsLoading(true); deleteServer()}}
                >
                  {isLoading?<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>: 'Désactiver mon serveur'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Annuler
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
            {notification}
    </div>
  );

  function deleteServer(){
    localStorage.removeItem('guildId');
    localStorage.removeItem('guildName');
    setIsLoading(false);
    window.location.reload();
  }
  
  async function ChangePaypal(){
    setIsPaypalLoading(true);
          await axios.put(`${apipath}/servers/${id}`,{
            paypal: paypalData
          } ,{
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
              }})
              .then(res => {
                if(res.status === 200){
                  setIsPaypalLoading(false);
                  setPaypalPlaceholder(paypalData);
                  showNotification("success", "Changement appliqué", `Votre adresse paypal a bien été modifié !`);
                  toast().success('Changement appliqué', `Votre adresse paypal a bien été modifié !`).for(3000).show() //display for 3000ms
                }
              }).catch(e =>{
                setIsPaypalLoading(false);
                showNotification("error", "Une erreur est survenue", `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`);
                toast().danger('Une erreur est survenue', `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`).for(6000).show() //display for 3000ms
                console.log(e);
              })
        }


}

export default Settings;