import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './FancySidebar.styles.scss';
import Logo from '../../img/logo_icon.png';

import { authContext } from '../../Context/Authentication.context';

const FancySidebar = () => {
  const { setAuthenticationStatus } = useContext(authContext)
    const logout = () => {
        setAuthenticationStatus(false);
        sessionStorage.clear();
    }
    return (
      <React.Fragment>
        <div className="logoIcon-background">
          <Link to="/dashboard">
            <img src={Logo} alt="3Line Logo" width="20" height="auto" />
          </Link>
        </div>
        <ul className="fancy-sidebar components">             
          {/* Dashboard */}
          <li title="Dashboard">
            <NavLink className="nav-link" to="/dashboard" activeClassName="selected">
              <i className="fa fa-home"></i>
            </NavLink>
          </li>

          {/*  User Management */}
          <li title="Users">
            <div className="nav-link"  aria-expanded="false">
              <NavLink to="/user-list">
                <i className="fa fa-users"></i>
              </NavLink>
            </div>
          </li>

          {/*  Device Setup / configuration */}
          <li title="Devices">
            <div className="nav-link" aria-expanded="false">
              <NavLink to="/device-list">
                <i className="fa fa-cogs"></i>
              </NavLink>
            </div>
          </li>

          {/*  Institution Management */}
          <li title="Institutions">
            <div className="nav-link"  aria-expanded="false">
              <NavLink to="/institution-list">
                <i className="fa fa-university"></i>
              </NavLink>
            </div> 
          </li>
          
          {/*  Reporting */}
          <li title="Reporting">
            <NavLink className="nav-link" to="/reporting" activeClassName="selected">
              <i className="fa fa-book"></i>
            </NavLink>
          </li>
          
          {/*  Audit */}
          <li title="Audit">
            <NavLink className="nav-link" to="/audit" activeClassName="selected">
              <i className="fa fa-file"></i>
            </NavLink>
          </li>

          {/*  Configurations */}
          <li title="Configuration">
            <NavLink className="nav-link" to="/configuration" activeClassName="selected">
              <i className="fa fa-cog"></i>
            </NavLink>
          </li>

          {/*  Roles and Permissions */}
          <li title="Configuration">
            <NavLink className="nav-link" to="/roles" activeClassName="selected">
              <i className="fa fa-key"></i>
            </NavLink>
          </li>         
          
          {/* { Logout } */}
          <li title="Logout">
            <NavLink className="nav-link" to="/" onClick={logout}>
              <i className="fa fa-sign-out"></i>
            </NavLink>
          </li>
        </ul>     
      </React.Fragment>
    )
}
export default FancySidebar;