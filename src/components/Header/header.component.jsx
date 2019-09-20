import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../../img/3linewhite.png';
import './header.styles.scss';
import { authContext } from '../../Context/Authentication.context';

const Header = ({history}) => {
    const { setAuthenticationStatus } = useContext(authContext)
    
    const logout = () => {
        setAuthenticationStatus(false);
        history.push('/')
    }
    return (
        <div className="top-bar">
            <Link to="/dashboard"><img src={Logo} alt="3 Line" width="72" height="auto"  /></Link>
                <button 
                className="btn btn-sm btn-danger"
                onClick={logout}
                >
                    Sign out
                </button>
        </div>
    )
}
export default withRouter(Header);