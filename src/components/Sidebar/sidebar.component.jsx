import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './sidebar.styles.scss';
import myFunction from './dropdown';

const Sidebar = ({history}) => {
  useEffect(() => {
    myFunction();
  }, [])
  
  const pathname = history.location.pathname;
    return (
      <React.Fragment>
        <div className="sidebar-sticky sidenav">
          <ul className="nav flex">             
          {/* Dashboard */}
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard" id={pathname === '/dashboard' ? 'active' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#262A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Dashboard</span>
            </Link>
          </li>

          {/*  User Management */}
          <li className="nav-item">
            <Link className="nav-link" to="/user-management" id={pathname === '/user-management' ? 'active' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#262A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>User Management</span>
            </Link>
          </li>

          {/*  Device Setup / configuration */}
          <li className="nav-item">
            <div className="nav-link dropdown-btn" id={pathname.includes('device') ? 'active' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#262A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
              <span>Device Setup / configuration</span>
            </div>
            <div className="dropdown-container">
              <ul>
                <li>
                  <Link id={pathname.includes('/device-setup') ? 'active' : ''} to="/device-setup">
                  Register a Terminal
                </Link>
                </li>
                <li>
                  <Link to="/device-list" id={pathname.includes('/device-list') ? 'active' : ''}>
                    View all Terminals  
                  </Link>
                </li>
              </ul>           
            </div>
          </li>

          {/*  Institution Management */}
          <li className="nav-item">
            <div className="nav-link dropdown-btn" id={pathname.includes('institution') ? 'active' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#262A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              <span>Institution Management</span>
            </div>
            <div className="dropdown-container">
              <ul>
                <li>
                  <Link to="/institution-setup" id={pathname.includes('/institution-setup') ? 'active' : ''}>
                    Register an Institution
                  </Link>
                </li>
                <li>
                  <Link to="/institution-list" id={pathname.includes('/device-list') ? 'active' : ''}>
                    View all Instistutions  
                  </Link>
                </li>
              </ul>           
            </div>
          </li>
          
          {/*  Reporting */}
          <li className="nav-item">
            <Link className="nav-link" to="/reporting" id={pathname === '/reporting' ? 'active' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#262A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <span>Reporting</span>
            </Link>
          </li>
          
          {/*  Products */}
          <li className="nav-item">
            <Link className="nav-link" to="/audit" id={pathname === '/audit' ? 'active' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#262A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Audit</span>
            </Link>
          </li>
        </ul>
        </div>      
      </React.Fragment>
    )
}
export default withRouter(Sidebar);