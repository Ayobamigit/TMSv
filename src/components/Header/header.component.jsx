import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/3linewhite.png';
import './header.styles.scss';

export default function() {
    return (
        <div className="top-bar">
            <Link to="/dashboard"><img src={Logo} alt="3 Line" width="72" height="auto"  /></Link>
            <Link to="/">
                <button 
                className="btn btn-sm btn-danger"
                >
                    Sign out
                </button>
            </Link>
        </div>
    )
}
