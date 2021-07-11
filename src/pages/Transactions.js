import React, { useState, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import List from '../partials/transaction/list';
import axios from 'axios';
import {apipath} from '../config.json';

function Transactions() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const[data, setData] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      await axios.get(`${apipath}/transactions?server.guildId=${localStorage.getItem('guildId')}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then(res => {
          const datas = res.data
          setData(datas);
          setLoading(false);
        }).catch(e =>{
          setLoading(false);
        })
    };    
    fetchDatas();
}, []);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
        <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 mb-2">
                {/* Time table button <Datepicker setDate={setDate} />    */ }
                            
              </div>
              {(!loading?<List data={data} setData={setData}/>:
              <div className="flex h-screen">
              <div className="m-auto">
                <svg class="animate-spin h-10 w-10 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
              </div></div>
              )}
            <div className="mt-2">
            {/* Export button */}
            {/*(!loading)?<ExportButton data={data}/> : null*/}            
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Transactions;