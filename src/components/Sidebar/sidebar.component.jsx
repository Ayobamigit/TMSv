import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.styles.scss';
import myFunction from './dropdown';

const Sidebar = () => {
  useEffect(() => {
    myFunction();
  }, [])
  const active = { fontWeight: 'bold', fontSize: '1.2', color: '#ff3547' }
    return (
      <React.Fragment>
        <ul>             
          {/* Dashboard */}
          <li>
            <NavLink className="nav-link" to="/dashboard" activeStyle={active}>
              <i className="fa fa-home"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/*  User Management */}
          <li>
            <NavLink className="nav-link" to="/user-management" activeStyle={active}>
              <i className="fa fa-users"></i>
              <span>User Management</span>
            </NavLink>
          </li>

          {/*  Device Setup / configuration */}
          <li>
            <div className="nav-link dropdown-btn">
              <NavLink to="#">
                <i className="fa fa-cogs"></i>
                <span>Device Setup / configuration</span>
              </NavLink>
            </div>
            <div className="dropdown-container">
              <ul>
                <li>
                  <NavLink to="/device-setup" activeStyle={active}>
                  Register a Terminal
                </NavLink>
                </li>
                <li>
                  <NavLink to="/device-list" activeStyle={active}>
                    View all Terminals  
                  </NavLink>
                </li>
              </ul>           
            </div>
          </li>

          {/*  Institution Management */}
          <li>
            <div className="nav-link dropdown-btn">
              <NavLink to="#">
                <i className="fa fa-university"></i>
                <span>Institution Management</span>
              </NavLink>
            </div>
            <div className="dropdown-container">
              <ul>
                <li>
                  <NavLink to="/institution-setup" activeStyle={active}>
                    Register an Institution
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/institution-list" activeStyle={active}>
                    View all Instistutions  
                  </NavLink>
                </li>
              </ul>           
            </div>
          </li>
          
          {/*  Reporting */}
          <li>
            <NavLink className="nav-link" to="/reporting" activeStyle={active}>
              <i className="fa fa-book"></i>
              <span>Reporting</span>
            </NavLink>
          </li>
          
          {/*  Products */}
          <li>
            <NavLink className="nav-link" to="/audit" activeStyle={active}>
              <i className="fa fa-file"></i>
              <span>Audit</span>
            </NavLink>
          </li>
        </ul>     
      </React.Fragment>
    )
}
export default Sidebar;