import React from 'react';
import { ArrowDownIcon } from '@heroicons/react/solid'

function ExportButton(props) {

  const {data} = props;
  
  return (
    <div className="relative inline-flex">
      <button
        onClick={() =>{console.log('todo')}}
        className="btn bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
        aria-haspopup="true"
      >
        <span className="sr-only">Export</span><wbr />
        <ArrowDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        <p className="ml-1">Exporter en JSON</p>
      </button>
    </div>
  );
}

export default ExportButton;
