import React from 'react';

import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';

class Home extends React.Component {
 
render(){
  return (
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner name={localStorage.getItem('username').split('#')[0]}/>

            {/* Cards */}
            <div className="grid lg:grid-cols-3 gap-4">
              <DashboardCard01 />
              <DashboardCard02 />
              <DashboardCard03 />
              <DashboardCard07 />
            </div>
          </div>
        </main>
  );
}
}

export default Home;