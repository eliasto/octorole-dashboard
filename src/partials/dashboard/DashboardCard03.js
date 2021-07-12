import React from 'react';
import axios from 'axios';
import {apipath} from '../../config.json';
import {strings} from '../../translations/lang';

export default class DashboardCard01 extends React.Component {

  state = {
    value: '0',
  }

  componentDidMount() {
    axios.get(`${apipath}/servers/turnover/${localStorage.getItem('guildId')}`, {
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
</svg>
      </header>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{strings.dashboard.home.cards.turnover}</h2>
      <div className="flex items-start">
        <div className="text-3xl font-bold text-gray-800 mr-2">{this.state.value} €</div>
      </div>
    </div></div>
  );
}
}