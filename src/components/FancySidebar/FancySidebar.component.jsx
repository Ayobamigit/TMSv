import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './FancySidebar.styles.scss';
import Logo from '../../img/logo_icon.png';

import { authContext } from '../../Context/Authentication.context';
import { hasPermission, CREATE_ROLES, CREATE_INSTITUTION } from '../../Utils/getPermission';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
              <FontAwesomeIcon icon="home" />
            </NavLink>
          </li>

          {/*  User Management */}
          <li title="Users">
            <div className="nav-link"  aria-expanded="false">
              <NavLink to="/user-list">
                <FontAwesomeIcon icon="users" />
              </NavLink>
            </div>
          </li>

          {/*  Device Setup / configuration */}
          <li title="Devices">
            <div className="nav-link" aria-expanded="false">
              <NavLink to="/device-list">
                <FontAwesomeIcon icon="cogs" />
              </NavLink>
            </div>
          </li>
          {/*  Institution Management */}
          {
            hasPermission(CREATE_INSTITUTION) ?
            <li title="Institutions">
              <div className="nav-link"  aria-expanded="false">
                <NavLink to="/institution-list">
                  <FontAwesomeIcon icon="university" />
                </NavLink>
              </div> 
            </li>
            : null
          } 

          {/* Wallet */}
          <li title="Wallet">
            <div className="nav-link"  aria-expanded="false">
              <NavLink to="/wallet/:id">
                <FontAwesomeIcon icon="wallet" />
              </NavLink>
            </div> 
          </li>
          
          {/*  Reporting */}
          <li title="Reporting">
            <NavLink className="nav-link" to="/reporting" activeClassName="selected">
              <FontAwesomeIcon icon="book" />
            </NavLink>
          </li>
          
          {/*  Audit */}
          <li title="Audit">
            <NavLink className="nav-link" to="/audit" activeClassName="selected">
              <FontAwesomeIcon icon="file" />
            </NavLink>
          </li>

          {/*  Configurations */}
          <li title="Configuration">
            <NavLink className="nav-link" to="/configuration" activeClassName="selected">
              <FontAwesomeIcon icon="cog" />
            </NavLink>
          </li>

          {/*  Roles and Permissions */}
          {
            hasPermission(CREATE_ROLES) ? 
            <li title="Roles and Permissions">
              <NavLink className="nav-link" to="/roles" activeClassName="selected">
                <FontAwesomeIcon icon="key" />
              </NavLink>
            </li> :
            null        
          }
          
          {/* { Logout } */}
          <li title="Logout">
            <NavLink className="nav-link" to="/" onClick={logout}>
              <FontAwesomeIcon icon="sign-out-alt" />
            </NavLink>
          </li>
        </ul>     
      </React.Fragment>
    )
}
export default FancySidebar;