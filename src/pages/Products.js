import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import List from '../partials/product/list';
import Pagination from '../partials/pagination';
import axios from 'axios';


function Products() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const[data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatas = async () => {
      await axios.get(`https://api.octorole.eliasto.me/products?server.guildId=${localStorage.getItem('guildId')}`, {
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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              
              {(!loading?<List data={data} setData={setData}/>:
              <div className="flex h-screen">
              <div className="m-auto">
                <svg class="animate-spin h-10 w-10 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
              </div></div>
              )}
              
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;