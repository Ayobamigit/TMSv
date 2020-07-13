import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './FancySidebar.styles.scss';
import Logo from '../../img/logo_icon.png';

import { authContext } from '../../Context/Authentication.context';
import { 
  hasPermission, 
  CREATE_ROLES, 
  CREATE_USER,
  VIEW_USER, 
  CREATE_TERMINALS, 
  CREATE_PROVIDERS, 
  CREATE_INSTITUTION, 
  VIEW_WALLET, 
  GLOBAL_SETTINGS, 
  CREATE_WALLET, 
  VIEW_INSTITUTION_INSTITUTION,
  VIEW_AUDIT,
  VIEW_INSTITUTION_AUDIT,
  VIEW_USER_AUDIT,
  VIEW_TRANSACTIONS,
  VIEW_TERMINALS,
  VIEW_ROLES
 } from '../../Utils/getPermission';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FancySidebar = () => {
  const { setAuthenticationStatus } = useContext(authContext)
  const { institution } = JSON.parse(sessionStorage.getItem('userDetails'));

    const logout = () => {
        setAuthenticationStatus(false);
        sessionStorage.clear();
        // window.location.href = "/"
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
              <FontAwesomeIcon icon="home" /><span></span>
            </NavLink>
          </li>

          {/*  User Management */}
          {hasPermission (CREATE_USER) || hasPermission (VIEW_USER) ?
          <li title="Users">
            <div className="nav-link"  aria-expanded="false">
              <NavLink to="/user-list">
                <FontAwesomeIcon icon="users" />
              </NavLink>
            </div>
          </li>:null}

          {/*  Device Setup / configuration */}
          {hasPermission (CREATE_TERMINALS) || hasPermission (VIEW_TERMINALS) ? 
          <li title="Devices">
            <div className="nav-link" aria-expanded="false">
              <NavLink to="/device-list">
                <FontAwesomeIcon icon="cogs" />
              </NavLink>
            </div>
          </li>:null}
          {/*  Institution Management */}
          {!institution?
            hasPermission(CREATE_INSTITUTION) ?
            <li title="Institutions">
              <div className="nav-link"  aria-expanded="false">
                <NavLink to="/institution-list">
                  <FontAwesomeIcon icon="university" />
                </NavLink>
              </div> 
            </li>
            : null:
            hasPermission (VIEW_INSTITUTION_INSTITUTION) ?
                <li title="View Institution">
                  <NavLink className="nav-link" to={`/institution-list/${institution.institutionID}`} activeClassName="selected">
                    <FontAwesomeIcon icon="university" />
                    {/* <span>View Institution</span> */}
                  </NavLink>
              </li>:null
          } 

          {/* Wallet */}
          {hasPermission (CREATE_WALLET) || hasPermission (VIEW_WALLET)?

          <li title="Wallet">
            <div className="nav-link"  aria-expanded="false">
              <NavLink to="/wallet/:id">
                <FontAwesomeIcon icon="wallet" />
              </NavLink>
            </div> 
          </li>: null}
          
          {/*  Reporting */}
          {hasPermission (VIEW_TRANSACTIONS) ?
          <li title="Reporting">
            <NavLink className="nav-link" to="/reporting" activeClassName="selected">
              <FontAwesomeIcon icon="book" />
            </NavLink>
          </li>:null}
          
          {/*  Audit */}
          {hasPermission ( VIEW_AUDIT) || hasPermission (VIEW_INSTITUTION_AUDIT) || hasPermission (VIEW_USER_AUDIT) ?
          <li title="Audit">
            <NavLink className="nav-link" to="/audit" activeClassName="selected">
              <FontAwesomeIcon icon="file" />
            </NavLink>
          </li>:null}

          {/*  Configurations */}
          {hasPermission (CREATE_PROVIDERS) || hasPermission (GLOBAL_SETTINGS) ?
          <li title="Configuration">
            <NavLink className="nav-link" to="/configuration" activeClassName="selected">
              <FontAwesomeIcon icon="cog" />
            </NavLink>
          </li>:null}

          {/*  Roles and Permissions */}
          {
            hasPermission(CREATE_ROLES) || hasPermission (VIEW_ROLES) ? 
            <li title="Roles and Permissions">
              <NavLink className="nav-link" to="/roles" activeClassName="selected">
                <FontAwesomeIcon icon="key" />
              </NavLink>
            </li> :
            null        
          }
          
          {/* { Logout } */}
          <li title="Logout">
            <NavLink className="nav-link" to="/sign-in" onClick={logout}>
              <FontAwesomeIcon icon="sign-out-alt" />
            </NavLink>
          </li>
        </ul>     
      </React.Fragment>
    )
}
export default FancySidebar;