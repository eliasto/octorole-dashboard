import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {apipath} from '../../config.json';
import {strings} from '../../translations/lang';

function DashboardCard07() {
  if(localStorage.getItem('jwt') == null){
    window.location.href = "/";
}
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatas = async () => {
    axios.get(`${apipath}/transactions?server.guildId=${localStorage.getItem('guildId')}`, {
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
        <h2 className="font-semibold text-gray-800">{strings.dashboard.home['transactions-lookup'].title}</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">{strings.dashboard.home['transactions-lookup'].emoji}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{strings.dashboard.home['transactions-lookup'].name}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{strings.dashboard.home['transactions-lookup'].price}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{strings.dashboard.home['transactions-lookup'].username}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{strings.dashboard.home['transactions-lookup'].time}</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
              {view}
            </tbody>
          </table>
          {(loading? <p className="text-center">{strings.dashboard.home['transactions-lookup'].loading}</p>: null)}
          {((!loading && items.length === 0)? <p className="text-center">{strings.dashboard.home['transactions-lookup'].null}</p>: null)}


        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
