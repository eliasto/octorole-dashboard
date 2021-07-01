import React from 'react';

function WelcomeBanner({
  name,
}) {    
  return (
    <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-1">Bonjour, {name}. 👋</h1>
        <p>Jetons un coup d'oeil à votre boutique:</p>
        <p className="text-indigo-500">Connecté sur <strong>{localStorage.getItem('guildName')}</strong>.</p>
      </div>

    </div>
  );
}

export default WelcomeBanner;
