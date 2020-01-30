import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './sidebar.styles.scss';
import Logo from '../../img/logo.png';
import { authContext } from '../../Context/Authentication.context';

const Sidebar = () => {
  const { setAuthenticationStatus } = useContext(authContext)
    const logout = () => {
        setAuthenticationStatus(false);
        sessionStorage.clear();
    }
    return (
      <React.Fragment>
        <div className="logo-background">
          <Link to="/dashboard">
            <img src={Logo} alt="3Line Logo" width="72" height="auto" />
          </Link>
        </div>
        <ul className="list-unstyled components">             
          {/* Dashboard */}
          <li>
            <NavLink className="nav-link" to="/dashboard" activeClassName="selected">
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
                <NavLink to="/user-setup" activeClassName="selected">
                  Register a User
                </NavLink>
              </li>
              <li>
                <NavLink to="/user-list" activeClassName="selected">
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
                <NavLink to="/device-setup" activeClassName="selected">
                  Register a Terminal
                </NavLink>
              </li>
              <li>
                <NavLink to="/device-list" activeClassName="selected">
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
                <NavLink to="/institution-setup" activeClassName="selected">
                  Register an Institution
                </NavLink>
              </li>
              <li>
                <NavLink to="/institution-list" activeClassName="selected">
                  View all Instistutions  
                </NavLink>
              </li>
            </ul> 
          </li>
          
          {/*  Reporting */}
          <li>
            <NavLink className="nav-link" to="/reporting" activeClassName="selected">
              <i className="fa fa-book"></i>
              <span>Reporting</span>
            </NavLink>
          </li>
          
          {/*  Audit */}
          <li>
            <NavLink className="nav-link" to="/audit" activeClassName="selected">
              <i className="fa fa-file"></i>
              <span>Audit</span>
            </NavLink>
          </li>

          {/*  Configurations */}
          <li>
            <NavLink className="nav-link" to="/configuration" activeClassName="selected">
              <i className="fa fa-cog"></i>
              <span>Configuration</span>
            </NavLink>
          </li>

          {/*  Roles and Permissions */}
          <li>
            <NavLink className="nav-link" to="/roles" activeClassName="selected">
              <i className="fa fa-key"></i>
              <span>Roles</span>
            </NavLink>
          </li>

          {/* { Logout } */}
          <li>
            <NavLink className="nav-link" to="/" onClick={logout}>
              <i className="fa fa-sign-out"></i>
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>     
      </React.Fragment>
    )
}
export default Sidebar;