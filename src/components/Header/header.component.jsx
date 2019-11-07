import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../img/3linewhite.png';
import './header.styles.scss';
import { authContext } from '../../Context/Authentication.context';

const Header = () => {
    const { setAuthenticationStatus } = useContext(authContext)
    const history = useHistory();
    const logout = () => {
        setAuthenticationStatus(false);
        sessionStorage.clear();
        history.push('/')
    }
    return (
        <div className="top-bar">
            <Link to="/dashboard">
                <img src={Logo} alt="3 Line" width="72" height="auto" />
            </Link>
            <button 
                className="btn btn-sm btn-danger"
                onClick={logout}
            >
                <i className="fa fa-power-off" aria-hidden="true"></i>
            </button>
        </div>
    )
}
export default Header;