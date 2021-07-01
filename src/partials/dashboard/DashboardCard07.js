import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardCard07() {
  if(localStorage.getItem('jwt') == null){
    window.location.href = "/";
}
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatas = async () => {
    axios.get(`https://api.octorole.eliasto.me/transactions?server.guildId=${localStorage.getItem('guildId')}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
      .then(res => {
        const datas = res.data;
        setItems(datas);
        setLoading(false);
      })
  } 
  fetchDatas();
  
}, []);

var view = [];
console.log(items)
var length = items.length;
if(items.length >=10){
  length = 10;
}


for(let i = 0;i<length;i++){
  var d= new Date(items[items.length-i-1].created_at);
  view.push(
    <tr>
          <td className="p-2">
          <div className="flex items-center bg-indigo-600 rounded-full w-9">
              <circle fill="#24292E" cx="18" cy="18" r="18" />
              <span className="p-2">{items[items.length-i-1].product.emoji}</span>
          </div>
        </td>
        <td className="p-2">
          <div className="text-center">{items[items.length-i-1].product.name}</div>
        </td>
        <td className="p-2">
          <div className="text-center text-green-500">{items[items.length-i-1].product.price} €</div>
        </td>
        <td className="p-2">
          <div className="text-center">{items[items.length-i-1].username}</div>
        </td>
        <td className="p-2">
          <div className="text-center text-indigo-500">{d.toDateString()} {d.getUTCHours()}:{d.getUTCMinutes()}</div>
        </td>
      </tr>
  );
  }

  
  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Vos dix derniers clients</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Emoji</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Nom du produit</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Montant</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Pseudonyme du client</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Date et heure de la transaction</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
              {view}
            </tbody>
          </table>
          {(loading? <p className="text-center">Chargement de vos statistiques...</p>: null)}
          {((!loading && items.length === 0)? <p className="text-center">Aucune transanctions d'enregistrées.</p>: null)}


        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
