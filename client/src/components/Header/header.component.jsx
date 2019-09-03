import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/3line_logo.png';
import './header.styles.scss';

export default function() {
    return (
        <div className="top-bar">
            <img src={Logo} alt="3 Line" width="72" height="auto"  />
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
