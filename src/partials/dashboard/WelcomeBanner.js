import React from 'react';
import {strings} from '../../translations/lang';

function WelcomeBanner({
  name,
}) {    
  return (
    <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-1">{strings.formatString(strings.dashboard.home.welcomebanner.title, {name: name})} 👋</h1>
        <p>{strings.dashboard.home.welcomebanner.subtitle}</p>
        <p className="text-indigo-500">{strings.formatString(strings.dashboard.home.welcomebanner.server, {server: <strong>{localStorage.getItem('guildName')}</strong>})}</p>
      </div>

    </div>
  );
}

export default WelcomeBanner;
