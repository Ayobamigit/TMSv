import React from 'react';
import './LoginError.styles.scss';

export default function LoginError() {
    return (
        <div className="alert alert-danger alert-dismissible out" id="loginError">
            Please enter correct credentials.
        </div>
    )
}
