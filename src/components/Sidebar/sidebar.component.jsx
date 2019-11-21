import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.styles.scss';

const Sidebar = () => {
  const active = { fontWeight: 'bold', fontSize: '1.2', color: '#ff3547' }
    return (
      <React.Fragment>
        <ul className="list-unstyled components">             
          {/* Dashboard */}
          <li>
            <NavLink className="nav-link" to="/dashboard" activeStyle={active}>
              <i className="fa fa-home"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/*  User Management */}
          <li>
            <div className="nav-link dropdown-toggle" href="#userSubmenu" data-toggle="collapse" aria-expanded="false">
              <NavLink to="#">
                <i className="fa fa-users"></i>
                <span>User Management</span>
              </NavLink>
            </div>
            <ul className="collapse list-unstyled nav-link" id="userSubmenu">
              <li>
                <NavLink to="/user-setup" activeStyle={active}>
                  Register a User
                </NavLink>
              </li>
              <li>
                <NavLink to="/user-list" activeStyle={active}>
                  View all Users  
                </NavLink>
              </li>
            </ul>
          </li>

          {/*  Device Setup / configuration */}
          <li>
            <div className="nav-link dropdown-toggle" href="#deviceSubmenu" data-toggle="collapse" aria-expanded="false">
              <NavLink to="#">
                <i className="fa fa-cogs"></i>
                <span>Device Setup</span>
              </NavLink>
            </div>
            <ul className="collapse list-unstyled nav-link" id="deviceSubmenu">
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
          </li>

          {/*  Institution Management */}
          <li>
            <div className="nav-link dropdown-toggle" href="#institutionSubmenu" data-toggle="collapse" aria-expanded="false">
              <NavLink to="#">
                <i className="fa fa-university"></i>
                <span>Institution Management</span>
              </NavLink>
            </div>
            <ul className="collapse list-unstyled nav-link" id="institutionSubmenu">
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