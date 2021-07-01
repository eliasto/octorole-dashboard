import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import List from '../partials/transaction/list';
import Pagination from '../partials/pagination';
import Datepicker from '../partials/actions/Datepicker';
import ExportButton from '../partials/actions/ExportButton';


function Transactions() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState([]);

  console.log(date);

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
                {/* Time table button */}
                <Datepicker setDate={setDate} />               
              </div>
            <List />
            <Pagination/>
            <div className="mt-2">
            {/* Export button */}
            <ExportButton/> 
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Transactions;