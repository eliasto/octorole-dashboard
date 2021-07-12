import { Fragment, useState, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EmojiHappyIcon, XIcon, LightBulbIcon } from '@heroicons/react/solid'
import { ExclamationIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
import Pagination from '../pagination';

import Picker from 'emoji-picker-react';
import axios from 'axios';
import {apipath} from '../../config.json';
import {strings} from '../../translations/lang';

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
  const [notification, setNotification] = useState([])

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
        <button className="ml-2" onClick={() => {setHighlightName(data[data.length-i-1].name); setHighlightIndex(data.length-i-1); setOpenModaleHighlight(!openModalHighlight);}}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
</svg></button>
          <button className="ml-2" onClick={() => {setOpen(!open); setValue(data[data.length-i-1]); setValueIndex(data.length-i-1); updateValues(data[data.length-i-1])}}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
<button className="ml-2" onClick={() => {setDeleteName(data[data.length-i-1].name); setDeleteIndex(data.length-i-1); setOpenModaleDelete(!openModalDelete)}}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg></button>

        </td>
      </tr>)
  } }

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
                    <span className="hidden xs:block ml-2">{strings.dashboard.products.add}</span>
                </button>                
              </div>
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">{strings.dashboard.products.title}</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.products.id}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.products.emoji}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.products.name}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.products.price}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.products.type}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.products.highlight}</div>
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
</tbody>: <p>{strings.dashboard.products.null}</p>}
           
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
                  {strings.formatString(strings.dashboard.products['product-modal'].title, {product: <strong>{value.name}</strong>})}
                  </Dialog.Title>
                  <div>
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                      {strings.dashboard.products['product-modal'].name}
                    </label>
                    <div className="mt-1">
                      <input type="text" name="nom" id="nom" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder={value.name} onChange={(e) => {setFormName(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:<div className="mt-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      {strings.dashboard.products['product-modal'].description}
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
                    {strings.dashboard.products['product-modal'].price}
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
                      {strings.dashboard.products['product-modal'].type}
                    </label>
                    <div className="mt-1">
                      <input type="text" name="type" id="type" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder={value.type}  onChange={(e) => {setFormType(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">
                      {strings.dashboard.products['product-modal'].expire}
                    </label>
                    <div className="mt-1">
                      <input type="text" name="expiration" id="expiration" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder={value.day}  onChange={(e) => {setFormDays(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      {strings.dashboard.products['product-modal'].roleId}
                    </label>
                    <div className="mt-1">
                      <input type="text" name="role" id="role" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder={value.roleId} onChange={(e) => {setFormRole(e.target.value)}}/>
                    </div>
                  </div>}
                  
                </div>
                <div className="text-center mt-2 items-center">
                    <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">
                      {strings.dashboard.products['product-modal'].selectedEmoji} {chosenEmoji ? (
                    <span>{chosenEmoji.emoji}</span>
                    ) : (
                    <span>{strings.dashboard.products['product-modal'].null}</span>
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
        {showEmoji?strings.dashboard.products['product-modal'].close: strings.dashboard.products['product-modal'].select}
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
                  {update? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>: strings.dashboard.products['product-modal'].confirm}
                  
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
                  {strings.formatString(strings.dashboard.products['product-modal-delete'].title, {product: deleteName})}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {strings.dashboard.products['product-modal-delete'].body}
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
                  {strings.dashboard.products['product-modal-delete'].delete}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpenModaleDelete(false)}
                  ref={cancelButtonRef}
                >
                  {strings.dashboard.products['product-modal-delete'].cancel}
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
                    {strings.dashboard.products.add}
                  </Dialog.Title>
                  <div>
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                      {strings.dashboard.products['product-modal'].name}
                    </label>
                    <div className="mt-1">
                      <input type="text" value={formName} name="nom" id="nom" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" onChange={(e) => {setFormName(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:<div className="mt-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      {strings.dashboard.products['product-modal'].description}
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
                    {strings.dashboard.products['product-modal'].price}
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
                      {strings.dashboard.products['product-modal'].type}
                    </label>
                    <div className="mt-1">
                      <input type="text" name="type" id="type" value={formType} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" onChange={(e) => {setFormType(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">
                      {strings.dashboard.products['product-modal'].expire}
                    </label>
                    <div className="mt-1">
                      <input type="text" name="expiration" value={formDays}id="expiration" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" onChange={(e) => {setFormDays(e.target.value)}}/>
                    </div>
                  </div>}
                  {showEmoji?null:
                  <div className="mt-2">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      {strings.dashboard.products['product-modal'].roleId}
                    </label>
                    <div className="mt-1">
                      <input type="text" name="role" id="role" value={formRole} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" onChange={(e) => {setFormRole(e.target.value)}}/>
                    </div>
                  </div>}
                  
                </div>
                <div className="text-center mt-2 items-center">
                    <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">
                      {strings.dashboard.products['product-modal'].selectedEmoji} {chosenEmoji ? (
                    <span>{chosenEmoji.emoji}</span>
                    ) : (
                    <span>{strings.dashboard.products['product-modal'].null}</span>
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
        {showEmoji?strings.dashboard.products['product-modal'].close: strings.dashboard.products['product-modal'].select}
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
                  {update? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>: strings.dashboard.products.add}
                  
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
                    {strings.dashboard.products['highlight-modal'].title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                    {strings.formatString(strings.dashboard.products['highlight-modal'].body, {name: <strong>{highlightName}</strong>, serverId: <a href={shopLink}>{shopLink}</a>})}
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
                  {strings.dashboard.products['highlight-modal'].confirm}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {setHighlight(highlightIndex, false);setOpenModaleHighlight(false)}}
                  ref={cancelButtonRef}
                >
                  {strings.dashboard.products['highlight-modal'].desactivate}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    </div>
    <Pagination count={count} setCount={setCount} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} max={data.length}/>
    {notification}
    </div>  
    
  );

  async function deleteProduct(index){
    await axios.delete(`${apipath}/products/${data[index].id}` ,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }})
        .then(res => {
          if(res.status === 200){
            showNotification("success", "Produit supprimé", `Le produit ${data[index].name} a bien été supprimé.`);
            toast().success('Produit supprimé', `Le produit ${data[index].name} a bien été supprimé.`).for(3000).show() //display for 3000ms
            window.location.reload();
          }
        }).catch(e =>{
          showNotification("error", "Une erreur est survenue", `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`);
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
            showNotification("success", "Changement appliqué", `Le produit ${formName} a bien été modifié !`);
            toast().success('Changement appliqué', `Le produit ${formName} a bien été modifié !`).for(3000).show() //display for 3000ms
          }
        }).catch(e =>{
          setUpdate(false);
          setOpen(false);
          showNotification("error", "Une erreur est survenue", `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`);
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
            showNotification("success", "Changement appliqué", `Le produit ${highlightName} a bien été modifié !`);
            toast().success('Changement appliqué', `Le produit ${highlightName} a bien été modifié !`).for(3000).show() //display for 3000ms
            window.location.reload();
          }
        }).catch(e =>{
          setUpdate(false);
          setOpen(false);
          showNotification("error", "Une erreur est survenue", `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`);
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
            showNotification("success", "Changement appliqué", `Le produit ${formName} a bien été ajouté !`);
            toast().success('Changement appliqué', `Le produit ${formName} a bien été ajouté !`).for(3000).show() //display for 3000ms
            window.location.reload();
          }
        }).catch(function (error){
          setUpdate(false);
          setOpenCreate(false);
          if(error.response.data.statusCode === 400){
            showNotification("error", "Formulaire incomplet", `Un ou plusieurs champs sont incomplets.`);
            toast().danger('Formulaire incomplet', `Un ou plusieurs champs sont incomplets.`).for(6000).show() //display for 3000ms
          }else{
            showNotification("error", "Une erreur est survenue", `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`);
          toast().danger('Une erreur est survenue', `Merci de réessayer dans quelques instants. Si le problème persiste, merci de contacter le support.`).for(6000).show() //display for 3000ms
          }
        })
    
  }
}


