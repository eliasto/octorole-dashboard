import React from 'react';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function List() {

  const customers = [
    {
      id: '0',
      image: Image01,
      name: 'Alex Shatov',
      email: 'alexshatov@gmail.com',
      location: '🇺🇸',
      spent: '$2,890.66',
    },
    {
      id: '1',
      image: Image02,
      name: 'Philip Harbach',
      email: 'philip.h@gmail.com',
      location: '🇩🇪',
      spent: '$2,767.04',
    },
    {
      id: '2',
      image: Image03,
      name: 'Mirko Fisuk',
      email: 'mirkofisuk@gmail.com',
      location: '🇫🇷',
      spent: '$2,996.00',
    },
    {
      id: '3',
      image: Image04,
      name: 'Olga Semklo',
      email: 'olga.s@cool.design',
      location: '🇮🇹',
      spent: '$1,220.66',
    },
    {
      id: '4',
      image: Image05,
      name: 'Burak Long',
      email: 'longburak@gmail.com',
      location: 'ACTIF',
      spent: '$1,890.66',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Toutes vos transactions</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Utilisateur id</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Transaction id</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Plateforme</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Produit</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Prix</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Date d'expiration</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Etat</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {
                customers.map(customer => {
                  return (
                    <tr key={customer.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">{customer.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.spent}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-700 rounded">{customer.location}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default List;
