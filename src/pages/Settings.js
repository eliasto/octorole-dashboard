import React, { useState, Fragment,useRef } from 'react';
import { Transition, Dialog } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function Settings() {
  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false);
  const [paypal, setPaypal] = useState(null);


  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        onChange={(e) => setPaypal(e.value)}
        type="text"
        name="paypal"
        id="paypal"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="you@example.com"
      />
    </div>
          <button
            onClick={()=>setOpen(!open)}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>

{/* Alerte suppression */}
          <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Supprimer le serveur d'octorole</h3>
        <div className="mt-2 text-sm text-gray-500">
          <p>Une fois le serveur supprimé, il ne sera impossible de récupérer les transactions, produits et autres informations. {/*Si besoin, veillez à exporter toutes les transactions depuis l'onglet "Transaction" puis "Exporter".*/}</p>
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
                  {isLoading?<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

    </div>
  );

  function deleteServer(){
    localStorage.removeItem('guildId');
    localStorage.removeItem('guildName');
    setIsLoading(false);
    window.location.reload();
  }

}

export default Settings;