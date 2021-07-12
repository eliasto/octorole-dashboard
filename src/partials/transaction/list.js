import React, {useState, Fragment} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/outline'

import Pagination from '../pagination';
import {strings} from '../../translations/lang';

function List(props) {

  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const {data} = props;

  var items = [];
  var maximum = 10*(count+1);
  if(maximum>= data.length){
    maximum = data.length;
  }
if(data.length !== 0){
  for(let i = 10*count;i<maximum;i++){
    const date = new Date(data[data.length-i-1].expire_at);
    items.push(
      <tr key={data[data.length-i-1].id}>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="font-medium text-gray-800">{data[data.length-i-1].id}</div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left">{data[data.length-i-1].userId}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left">{data[data.length-i-1].transactionId}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium">{data[data.length-i-1].provider}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium">{data[data.length-i-1].product.name}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">{data[data.length-i-1].product.price} €</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium">{date.toString().substring(0, date.toString().indexOf('(')-1)}</div>
        </td>
        {(data[data.length-i-1].active?                       <td className="p-2 whitespace-nowrap">
          <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-700 rounded">{strings.dashboard.transactions.active}</div>
        </td>:                       <td className="p-2 whitespace-nowrap">
          <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-700 rounded">{strings.dashboard.transactions.inactive}</div>
        </td>)}
        
        <td className="p-2 whitespace-nowrap">
        <button className="ml-2" onClick={() => {setValue(data[data.length-i-1]); setOpen(true);}}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
</svg></button>
        </td>
      </tr>)
  } }



  return (
    <div>
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">{strings.dashboard.transactions.title}</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Id</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.transactions.userId}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.transactions.transactionId}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.transactions.provider}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.transactions.product}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.transactions.price}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.transactions.expiration}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{strings.dashboard.transactions.state}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {items}
            </tbody>
          </table>

        </div>

      </div>
    </div>
    <Pagination count={count} setCount={setCount} max={data.length}/>

    {/* View transaction */}
    {(value)?<Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={open} onClose={setOpen}>
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <InformationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                  {strings.formatString(strings.dashboard.transactions['transaction-modal'].title, {id: value.transactionId})}
                  </Dialog.Title>
                  <div className="mt-2 text-left">
                    <p className="text-sm text-gray-500">
                      <span className="font-bold">{strings.dashboard.transactions['transaction-modal'].time}</span> {value.created_at}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-bold">{strings.dashboard.transactions['transaction-modal'].userId}</span> {value.userId}/{value.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-bold">{strings.dashboard.transactions['transaction-modal'].expire}</span> {value.expire_at}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-bold">{strings.dashboard.transactions['transaction-modal'].claimed}</span> {(value.claimed?value.claimed_at:'Non')}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-bold">{strings.dashboard.transactions['transaction-modal'].provider}</span> {value.provider}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-bold">{strings.dashboard.transactions['transaction-modal'].product}</span> {value.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-bold">{strings.dashboard.transactions['transaction-modal'].price}</span> {value.product.price} €
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  {strings.dashboard.transactions['transaction-modal'].close}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>: null}
    
    </div>
  );
}

export default List;
