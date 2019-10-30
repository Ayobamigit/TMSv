import React, { useState, useLayoutEffect, useEffect } from 'react';
import './layout.styles.scss';

import Header from '../Header/header.component';
import Sidebar from '../Sidebar/sidebar.component';

export default function Layout ({ children }) {
  const [sidebar, setSidebar] = useState(true);
    useLayoutEffect(() => {
      // Setting Sidebar Dynamically based on window screen width
      if(window.innerWidth < 900){
        setSidebar(false)
      }
    }, [])
    useEffect(() => {
      if(sidebar){
        if(window.innerWidth < 900){
          document.getElementById("main").style.marginLeft = "70%";
          document.getElementById("mySidebar").style.width = "70%";
        } else {
          document.getElementById("main").style.marginLeft = "15%";
          document.getElementById("mySidebar").style.width = "15%";
        }
        document.getElementById("mySidebar").style.display = "block";
      } else {
        document.getElementById("main").style.marginLeft = "0%";
        document.getElementById("mySidebar").style.display = "none";
      }
    }, [sidebar])
    const toggleSidebar = () => {
      setSidebar(!sidebar);
    }
    return (
      <React.Fragment>
        <Header /> 
        <div id="wrapper">
          <div style={{display:'none'}} id="mySidebar">
            <Sidebar />           
          </div>
          <div id="main" style={{position: 'relative'}}>
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
          </div>
        </div>
      </React.Fragment>
    )
}
