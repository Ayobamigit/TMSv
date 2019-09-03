import React, {useState} from 'react';
import './layout.styles.scss';

import Header from '../Header/header.component';
import Sidebar from '../Sidebar/sidebar.component';

export default function Layout ({ children }) {
  const [sidebar, setSidebar] = useState(true)
  const toggleSidebar = () => {

    setSidebar(!sidebar);
  }
    return (
    <React.Fragment>
      <Header /> 
    <div className="container-fluid">
      <div className="row">
        <nav className={ sidebar ? "col-md-2 d-md-block bg-light sidebar" : '' }>
          {
            sidebar ? <Sidebar /> : null
          }           
        </nav>
       <main role="main" className={ sidebar ? "col-md-9 ml-sm-auto col-lg-10 px-4" : 'col-md-12 ml-sm-auto col-lg-12 px-4'}>
          <div className="children">
          <div 
            className={sidebar ? "menu-toggle-btn open" : "menu-toggle-btn"}
            onClick={toggleSidebar}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
				    {children}
			    </div>
        </main>
      </div>
    </div>

    
  

</React.Fragment>
    )
}
