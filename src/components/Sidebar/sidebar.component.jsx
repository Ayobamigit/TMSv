import React, { useContext, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './sidebar.styles.scss';
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
import Logo from '../../img/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { authContext } from '../../Context/Authentication.context';

const Sidebar = () => {
  const { setAuthenticationStatus } = useContext(authContext)
  const { institution } = JSON.parse(sessionStorage.getItem('userDetails'));

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
              <FontAwesomeIcon icon="home" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/*  User Management */}
          {hasPermission (CREATE_USER) || hasPermission (VIEW_USER) ?
          <li>
            <div className="nav-link dropdown-toggle" href="#userSubmenu" data-toggle="collapse" aria-expanded="false">
              <NavLink to="#">
                <FontAwesomeIcon icon="users" />
                <span>User Management</span>
              </NavLink>
            </div>
            <ul className="collapse list-unstyled nav-link" id="userSubmenu">
              {
                hasPermission(CREATE_USER) ?
                <li>
                  <NavLink to="/user-setup" activeClassName="selected">
                    Register a User
                  </NavLink>
                </li>: null
              }

              { 
              hasPermission(VIEW_USER) ?
              <li>
                <NavLink to="/user-list" activeClassName="selected">
                  View all Users  
                </NavLink>
              </li> :null
              }
            </ul>
          </li>:null}

          {/*  Device Setup / configuration */}
          {hasPermission (CREATE_TERMINALS) || hasPermission (VIEW_TERMINALS) ? 
          <li>
            <div className="nav-link dropdown-toggle" href="#deviceSubmenu" data-toggle="collapse" aria-expanded="false">
              <NavLink to="#">
                <FontAwesomeIcon icon="cogs" />
                <span>Terminal Management</span>
              </NavLink>
            </div>
            <ul className="collapse list-unstyled nav-link" id="deviceSubmenu">
              {
                hasPermission(CREATE_TERMINALS) ?
                  <li>
                    <NavLink to="/device-setup" activeClassName="selected">
                      Register a Terminal
                    </NavLink>
                  </li>
                  : null
              }
              <li>
                <NavLink to="/device-list" activeClassName="selected">
                  View all Terminals  
                </NavLink>
              </li>
            </ul>
          </li>: null}

          {/*  Institution Management */}
            {!institution?
              hasPermission(CREATE_INSTITUTION) ?
              <li>
                <div className="nav-link dropdown-toggle" href="#institutionSubmenu" data-toggle="collapse" aria-expanded="false">
                  <NavLink to="#">
                    <FontAwesomeIcon icon="university" />
                    <span>Institution Management</span>
                  </NavLink>
                </div>
                <ul className="collapse list-unstyled nav-link" id="institutionSubmenu">
                  <Fragment>
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
                  </Fragment>
                </ul> 
              </li>
              : null:
              hasPermission (VIEW_INSTITUTION_INSTITUTION) ?
                <li>
                  <NavLink className="nav-link" to={`/institution-list/${institution.institutionID}`} activeClassName="selected">
                    <FontAwesomeIcon icon="university" />
                    <span>View Institution</span>
                  </NavLink>
              </li>:null
            }
          
          {/*  Wallet */}            
          {
            hasPermission (CREATE_WALLET) || hasPermission (VIEW_WALLET)?
              <li>
                <NavLink className="nav-link" to="/wallets" activeClassName="selected">
                  <FontAwesomeIcon icon="wallet" />
                  <span>Wallets</span>
                </NavLink>
              </li>
              : null
          }
          
          {/*  Reporting */}
          {hasPermission (VIEW_TRANSACTIONS) ?
          <li>
            <NavLink className="nav-link" to="/reporting" activeClassName="selected">
              <FontAwesomeIcon icon="book" />
              <span>Reporting</span>
            </NavLink>
          </li> : null}
          
          {/*  Audit */}
          {hasPermission ( VIEW_AUDIT) || hasPermission (VIEW_INSTITUTION_AUDIT) || hasPermission (VIEW_USER_AUDIT) ?
          <li>
            <NavLink className="nav-link" to="/audit" activeClassName="selected">
              <FontAwesomeIcon icon="file" />
              <span>Audit</span>
            </NavLink>
          </li> : null}

          {/*  Configurations */}
          {hasPermission (CREATE_PROVIDERS) || hasPermission (GLOBAL_SETTINGS) ?
          <li>
            <div className="nav-link dropdown-toggle" href="#configurationSubmenu" data-toggle="collapse" aria-expanded="false">
              <NavLink to="#">
                <FontAwesomeIcon icon="cog" />
                <span>Configuration</span>
              </NavLink>
            </div>
            <ul className="collapse list-unstyled nav-link" id="configurationSubmenu">
              { hasPermission(CREATE_PROVIDERS)?
                <li>
                <NavLink to="/configuration" activeClassName="selected">
                  Service Providers
                </NavLink>
              </li>: null
              }
              
              {
                hasPermission(GLOBAL_SETTINGS) && institution ? 
                <li>
                  <NavLink to="/globalsetting" activeClassName="selected">
                    Global Settings
                  </NavLink>
                </li>
                : null
              }
            </ul> 
          </li>: null}

          {/*  Roles and Permissions */}
          {
            hasPermission(CREATE_ROLES) || hasPermission (VIEW_ROLES) ? 
            <li>
              <NavLink className="nav-link" to="/roles" activeClassName="selected">
                <FontAwesomeIcon icon="key" />
                <span>Roles</span>
              </NavLink>
            </li> : 
            null
          }

          {/* { Logout } */}
          <li>
            <NavLink className="nav-link" to="/" onClick={logout}>
              <FontAwesomeIcon icon="sign-out-alt" />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>     
      </React.Fragment>
    )
}
export default Sidebar;