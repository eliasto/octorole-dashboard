/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */

import {strings} from '../translations/lang';

export default function Pagination({count, setCount, max}) {
  var nextValue = 10*(count+1);
  if(nextValue >= max){
    nextValue = max;
  }
  if(max%10 === 0){
    if(((count*10)+1) > max){
      setCount(count-1);
    }
  }

  var previousValue = (count*10)+1;
  if(previousValue < 0){
    previousValue = 0;
  }
  
  return (
    <nav
      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
        {strings.formatString(strings.dashboard.products.pagination, {index:<span className="font-medium">{previousValue}</span>, next:<span className="font-medium">{nextValue}</span>, total:<span className="font-medium">{max}</span>})}
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
        onClick={() => {
          if(count<=0){
          setCount(0);
        } else {
          setCount(count-1);
        }}}
        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
</svg>
        </button>
        <button
          onClick={() => {
            if(nextValue <max){
              setCount(count+1);
            }
          }}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
</svg>
        </button>
      </div>
    </nav>
  )

}
