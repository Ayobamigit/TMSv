import React, { useState, useLayoutEffect, useEffect } from 'react';
import './layout.styles.scss';
import Sidebar from '../Sidebar/sidebar.component';
import FancySidebar from '../FancySidebar/FancySidebar.component';

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
      if(window.innerWidth < 960){
        //View on Mobile devices. The sidebar should cover the entire screen and have a padding top of 50px
        document.getElementById("mySidebar").style.width = "100%";
        document.getElementById("mySidebar").style.paddingTop = "50px";
      } else {
        //View on Computer devices. The sidebar should take 15% of the screen and the main screen have a mergin left of 15%
        document.getElementById("main").style.marginLeft = "15%";
        document.getElementById("mySidebar").style.width = "15%";

      }
      //Whether the device is mobile or computer, the sidebar will always be displayed if sidebar state is true
      document.getElementById("mySidebar").style.display = "block";
    } else {

      // Don't display the fancy sidebar if the device is a mobile phone
      if(window.innerWidth < 960){
        document.getElementById("myFancySidebar").style.display = "none";
      } else {
      // Display the fancy sidebar if the device is a computer. Since the sidebar has a width of 50px, the main content should have a margin left of 50px too
        document.getElementById("main").style.marginLeft = "50px";
        document.getElementById("myFancySidebar").style.display = "block";
        document.getElementById("myFancySidebar").style.width = "50px";
        document.getElementById("manipulateChildren").style.display = "block";
      }
    }
  }, [sidebar])
  
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  }
 
  return (
    <React.Fragment>
      {/* <Header />  */}
      <div id="wrapper">
        {
          sidebar ? 
          <div style={{display:'none'}} id="mySidebar">
            <Sidebar />         
          </div>
          :
          <div id="myFancySidebar">
            <FancySidebar />
          </div>
        }
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
            <div id="manipulateChildren">
              {children}
            </div>              
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
