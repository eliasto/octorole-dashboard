import React from 'react';
import axios from 'axios';

// Import utilities

export default class DashboardCard02 extends React.Component {

  state = {
    value: '0',
  }

  componentDidMount() {
    axios.get(`https://api.octorole.eliasto.me/products/count?server.guildId=${localStorage.getItem('guildId')}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
      .then(res => {
        const value = res.data;
        this.setState({ value });
      })
  }
render(){
  return (
    <div className="flex bg-white shadow-lg rounded-sm border border-gray-200 mb-5 py-3 w-auto">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
</svg>
        </header>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Produits actifs</h2>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 mr-2">{this.state.value}</div>
        </div>
      </div></div>
  );
}
}
