import { Fragment, useState, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EmojiHappyIcon, XIcon, LightBulbIcon } from '@heroicons/react/solid'
import { ExclamationIcon } from '@heroicons/react/outline'
import Pagination from '../pagination';

import Picker from 'emoji-picker-react';
import axios from 'axios';
import {apipath} from '../../config.json';

const { toast } = require('tailwind-toast')

export default function List(props){
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [update, setUpdate] = useState(false);
  const [valueIndex, setValueIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [openModalDelete, setOpenModaleDelete] = useState(false);
  const cancelButtonRef = useRef(null);
  const [deleteName, setDeleteName] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [count, setCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlightName, setHighlightName] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [openModalHighlight, setOpenModaleHighlight] = useState(false);


  /* Partie update */
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [formName, setFormName] = useState(null);
  const [formDescription, setFormDescription] = useState(null);
  const [formPrice, setFormPrice] = useState(null);
  const [formType, setFormType] = useState(null);
  const [formDays, setFormDays] = useState(null);
  const [formRole, setFormRole] = useState(null);


  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const shopLink = 'https://octorole.xyz/shop/'+localStorage.getItem('guildId')
  const {data} = props;

  useEffect(() =>{
    const setCountFunction = () => {
    }
    setCountFunction();
}, []);

  var items = [];
  var maximum = 10*(count+1);
  if(maximum>= data.length){
    maximum = data.length;
  }
if(data.length !== 0){
  for(let i = 10*count;i<maximum;i++){
    items.push(
      <tr key={data[data.length-i-1].id}>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="font-medium text-gray-800">{data[data.length-i-1].id}</div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left">{data[data.length-i-1].emoji}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium">{data[data.length-i-1].name}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">{data[data.length-i-1].price} €</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium">{data[data.length-i-1].type}</div>
        </td>
        {(data[data.length-i-1].highlight?                       <td className="p-2 whitespace-nowrap">
          <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-700 rounded">Activé</div>
        </td>:                       <td className="p-2 whitespace-nowrap">
          <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-700 rounded">Désactivé</div>
        </td>)}
        <td className="p-2 whitespace-nowrap">
        <button className="ml-2" onClick={() => {setHighlightName(data[data.length-i-1].name); setHighlightIndex(data.length-i-1); setOpenModaleHighlight(!openModalHighlight)}}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
</svg></button>
          <button className="ml-2" onClick={() => {setOpen(!open); setValue(data[data.length-i-1]); setValueIndex(data.length-i-1); updateValues(data[data.length-i-1])}}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
<button className="ml-2" onClick={() => {setDeleteName(data[data.length-i-1].name); setDeleteIndex(data.length-i-1); setOpenModaleDelete(!openModalDelete)}}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg></button>

        </td>
      </tr>)
  } }

  return (
    <div>
      {/* Right: Actions */}
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 mb-2">
                {/* Add view button */}
                <button 
                onClick={() => {setOpenCreate(!openCreate); setFormName(null); setFormType(null); setFormDescription(null); setFormPrice(null); setFormRole(null); setFormDays(null)}}
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 flex-shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Ajouter un produit</span>
                </button>                
              </div>
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Gérer vos produits</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Produit id</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Emoji</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Nom</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Prix</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Type</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Mise en avant</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left"></div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {(data.length !== 0)?
            
            <tbody className="text-sm divide-y divide-gray-100">
                {items}                  
</tbody>: <p>Aucun produit n'est associé au serveur.</p>}
           
          </table>

        </div>

      </div>
      {/* Editer la fiche produit */}

      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto mt-20" open={open} onClose={setOpen}>
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle lg:max-w-lg sm:w-full sm:p-6">
              <div>
              <button onClick={() => {setOpen(false)}}>
              <XIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              </button>

                <div className="mt-3 sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg text-center leading-6 font-medium text-gray-900">
                    Modification de la fiche produit <strong>{value.name}</strong>
                  </Dialog.Title>
                  <div>
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <div className="mt-1">
                      <input type="text" name="nom" id="nom" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder={value.name} onChange={(e) => {setFormName(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:<div className="mt-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder={value.description}
                        defaultValue={value.description}
                        onChange={(e) => {setFormDescription(e.target.value)}}
                        />
                      </div>
                  </div>}
                  {showEmoji?null:
                  <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Prix
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder={value.price}
                      onChange={(e) => {setFormPrice(e.target.value)}}
                    />
                  </div>
                </div>}
                {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <div className="mt-1">
                      <input type="text" name="type" id="type" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder={value.type}  onChange={(e) => {setFormType(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">
                      Nombre de jours après expiration
                    </label>
                    <div className="mt-1">
                      <input type="text" name="expiration" id="expiration" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder={value.day}  onChange={(e) => {setFormDays(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Identifiant du rôle
                    </label>
                    <div className="mt-1">
                      <input type="text" name="role" id="role" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder={value.roleId} onChange={(e) => {setFormRole(e.target.value)}}/>
                    </div>
                  </div>}
                  
                </div>
                <div className="text-center mt-2 items-center">
                    <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">
                      Emoji sélectionné: {chosenEmoji ? (
                    <span>{chosenEmoji.emoji}</span>
                    ) : (
                    <span>aucun</span>
                    )}
                    </label>
                    <div>
                    {showEmoji? <div className="mb-2"><center><Picker onEmojiClick={onEmojiClick} /></center></div>:null}
                    <button
                    onClick={() => {setShowEmoji(!showEmoji)}}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white mt-1 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <EmojiHappyIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        {showEmoji?"Fermer le sélecteur d'émoji": "Sélectionner un émoji"}
      </button>                   
                </div>
                  </div> 
              </div>
              </div>{/* ici */}
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {setUpdate(true); updateForm(value, valueIndex);}}
                >
                  {update? <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>: 'Mettre à jour la fiche produit'}
                  
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>


    {/* Modal Delete */}
    <Transition.Root show={openModalDelete} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={openModalDelete}
        onClose={setOpenModaleDelete}
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Supprimer le produit {deleteName}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Attention, la supression du produit est irréverssible. Veuillez confirmer cette action.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {setOpenModaleDelete(false); deleteProduct(deleteIndex); }}
                >
                  Supprimer
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpenModaleDelete(false)}
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

        {/* Ajouter un produit */}

        <Transition.Root show={openCreate} as={Fragment}>
      <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto mt-20" open={openCreate} onClose={setOpenCreate}>
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle lg:max-w-lg sm:w-full sm:p-6">
              <div>
              <button onClick={() => {setOpenCreate(false)}}>
              <XIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              </button>

                <div className="mt-3 sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg text-center leading-6 font-medium text-gray-900">
                    Ajouter un nouveau produit
                  </Dialog.Title>
                  <div>
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <div className="mt-1">
                      <input type="text" value={formName} name="nom" id="nom" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" onChange={(e) => {setFormName(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:<div className="mt-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formDescription}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => {setFormDescription(e.target.value)}}
                        />
                      </div>
                  </div>}
                  {showEmoji?null:
                  <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Prix
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={formPrice}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => {setFormPrice(e.target.value)}}
                    />
                  </div>
                </div>}
                {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <div className="mt-1">
                      <input type="text" name="type" id="type" value={formType} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" onChange={(e) => {setFormType(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">
                      Nombre de jours après expiration
                    </label>
                    <div className="mt-1">
                      <input type="text" name="expiration" value={formDays}id="expiration" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" onChange={(e) => {setFormDays(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Identifiant du rôle
                    </label>
                    <div className="mt-1">
                      <input type="text" name="role" id="role" value={formRole} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" onChange={(e) => {setFormRole(e.target.value)}}/>
                    </div>
                  </div>}
                  
                </div>
                <div className="text-center mt-2 items-center">
                    <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">
                      Emoji sélectionné: {chosenEmoji ? (
                    <span>{chosenEmoji.emoji}</span>
                    ) : (
                    <span>aucun</span>
                    )}
                    </label>
                    <div>
                    {showEmoji? <div className="mb-2"><center><Picker onEmojiClick={onEmojiClick} /></center></div>:null}
                    <button
                    onClick={() => {setShowEmoji(!showEmoji)}}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white mt-1 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <EmojiHappyIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        {showEmoji?"Fermer le sélecteur d'émoji": "Sélectionner un émoji"}
      </button>                   
                </div>
                  </div> 
              </div>
              </div>{/* ici */}
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {setUpdate(true); createForm();}}
                >
                  {update? <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>: 'Créer un nouveau produit'}
                  
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

    {/* Edit highlight */}
    <Transition.Root show={openModalHighlight} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={openModalHighlight}
        onClose={setOpenModaleHighlight}
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                  <LightBulbIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Mise en avant
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Souhaitez-vous mettre en avant le produit <strong>{highlightName}</strong> ? En le mettant en avant, il sera accessible via la commande !shop sur votre serveur Discord, et sera affiché en premier dans votre boutique (<a href={shopLink}>{shopLink}</a>). Vous pouvez désactiver la mise en avant de votre produit en revenant dans ce menu.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => {setHighlight(highlightIndex, true);setOpenModaleHighlight(false)}}
                >
                  Mettre en avant
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {setHighlight(highlightIndex, false);setOpenModaleHighlight(false)}}
                  ref={cancelButtonRef}
                >
                  Désactiver
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

    </div>
    <Pagination count={count} setCount={setCount} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} max={data.length}/>
    </div>  
    
  );

  async function deleteProduct(index){
    await axios.delete(`${apipath}/products/${data[index].id}` ,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }})
        .then(res => {
          if(res.status === 200){
            toast().success('Produit supprimé', `Le produit ${data[index].name} a bien été supprimé.`).for(3000).show() //display for 3000ms
            window.location.reload();
          }
        }).catch(e =>{
          toast().danger('Une erreur est survenue', `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`).for(6000).show() //display for 3000ms
          console.log(e);
        })
  }

  function updateValues(value){
    setFormName(value.name);
    setFormPrice(value.price);
    setChosenEmoji(value.emoji);
    setFormDescription(value.description);
    setFormDays(value.day);
    setFormRole(value.roleId);
    setFormType(value.type);
    setChosenEmoji(value.emoji);
  }

  async function updateForm(value, index){
    await axios.put(`${apipath}/products/${value.id}`,{
      name: formName,
      description: formDescription,
      price: formPrice,
      type: formType,
      emoji: chosenEmoji.emoji,
      day: formDays,
      roleId: formRole
    } ,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }})
        .then(res => {
          data[index].name = formName;
          data[index].description=  formDescription;
          data[index].price = formPrice;
          data[index].type = formType;
          data[index].emoji = chosenEmoji.emoji;
          data[index].da = formDays;
          data[index].roleId = formRole;
          setUpdate(false);
          setOpen(false);
          if(res.status === 200){
            toast().success('Changement appliqué', `Le produit ${formName} a bien été modifié !`).for(3000).show() //display for 3000ms
          }
        }).catch(e =>{
          setUpdate(false);
          setOpen(false);
          toast().danger('Une erreur est survenue', `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`).for(6000).show() //display for 3000ms
          console.log(e);
        })
    
  }

  async function setHighlight(index, boolean){
    await axios.put(`${apipath}/products/${data[index].id}`,{
      highlight: boolean
    } ,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }})
        .then(res => {
          data[index].highlight = boolean;
          setUpdate(false);
          setOpen(false);
          if(res.status === 200){
            toast().success('Changement appliqué', `Le produit ${highlightName} a bien été modifié !`).for(3000).show() //display for 3000ms
            window.location.reload();
          }
        }).catch(e =>{
          setUpdate(false);
          setOpen(false);
          toast().danger('Une erreur est survenue', `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`).for(6000).show() //display for 3000ms
          console.log(e);
        })
  }

  async function createForm(){
    var emojiData;
    if(chosenEmoji === null){
      emojiData = '✨';
    } else {
      emojiData = chosenEmoji.emoji
    }
    var indexGuildId;
    await axios.get(`${apipath}/servers?guildId=${localStorage.getItem('guildId')}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then(res => {
          indexGuildId = res.data[0].id;
        }).catch(function (error){
        })
    await axios.post(`${apipath}/products`,{
      name: formName,
      description: formDescription,
      price: formPrice,
      type: formType,
      emoji: emojiData,
      day: formDays,
      roleId: formRole,
      server: [indexGuildId]
    } ,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }})
        .then(res => {
          setUpdate(false);
          setOpenCreate(false);
          if(res.status === 200){
            toast().success('Changement appliqué', `Le produit ${formName} a bien été ajouté !`).for(3000).show() //display for 3000ms
            window.location.reload();
          }
        }).catch(function (error){
          setUpdate(false);
          setOpenCreate(false);
          if(error.response.data.statusCode === 400){
            toast().danger('Formulaire incomplet', `Un ou plusieurs champs sont incomplets.`).for(6000).show() //display for 3000ms
          }else{
          toast().danger('Une erreur est survenue', `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`).for(6000).show() //display for 3000ms
          }
        })
    
  }
}


