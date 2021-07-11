import React from 'react';
import axios from 'axios';
import {apipath} from '../../config.json';

export default class DashboardCard01 extends React.Component {

  state = {
    value: '0',
  }

  componentDidMount() {
    axios.get(`${apipath}/transactions/count?server.guildId=${localStorage.getItem('guildId')}`, {
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        </header>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Nombre de clients</h2>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 mr-2">{this.state.value}</div>
        </div>
      </div></div>
  );
}
}
