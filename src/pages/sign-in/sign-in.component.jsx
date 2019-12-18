import React, { useState, useContext, useEffect } from 'react';
import './sign-in.styles.scss';
import axios from 'axios';
import { authContext } from '../../Context/Authentication.context';
import { institutionLoginUrl } from '../../Utils/URLs';
import { FetchTimeOut } from '../../Utils/FetchTimeout'

import Logo from '../../img/logo.png';
import BlueLogo from '../../img/logo.png';
import IsFetching from '../../components/isFetching/IsFetching.component';
import LoginError from '../../components/LoginError/LoginError.component';

const SignIn = ({ history }) => { 
    const [ state, setState ] = useState({
        username: '',
        password: '',
        isLoggingIn: false,
        loginError: false
    });

    useEffect(() => {
        sessionStorage.clear();
    }, []);
    
    const { setAuthenticationStatus } = useContext(authContext)
    const onSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            alert('Please Fill all fields')
        } else {
            setState({ ...state, isLoggingIn: true, loginError: false})
            let reqBody = {
                username,
                password
            }

            axios({
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                url: `${institutionLoginUrl}`,
                data: reqBody,
                timeout: FetchTimeOut
            })
            .then(response => {
                setState({ ...state, isLoggingIn: false })
                if (response.data.respCode === '00') {
                    setAuthenticationStatus(true)
                    sessionStorage.setItem('userDetails', JSON.stringify({
                        authToken: response.data.respBody.authToken,
                        userName: state.username.toUpperCase(),
                        institution: response.data.respBody.institution,
                        role: response.data.respBody.role
                    }))
                    history.push('/dashboard')
                } else {
                    setAuthenticationStatus(false);
                    setState({
                        ...state,
                        loginError: true
                    })
                } 
            })
            .catch(e => {
                setState({ ...state, isLoggingIn: false })
            })
        }
    }

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value, loginError: false });
    }

    const { username, password, isLoggingIn, loginError } = state;
    return (
        <div className="signInContainerWrapper">
            <div className="signInContent">
                <img src={Logo} alt="" />
                <div className="welcome-text">
                    Welcome to 3Line Terminal Management System
                </div>
                <p className="text-justify">
                    A centralised Terminal Management System that manages all remote terminals, institutions and users.
                </p>
            </div>
            <div className="signInwrapper">
                <div className="signInContainer">
                    <img src={BlueLogo} alt="" />
                    <form className="form-signin" onSubmit={onSubmit}>              
                        <div className="welcome-text">Please sign in</div> <br />
                        <label htmlFor="userName" className="sr-only">Username</label>
                        <input 
                            type="text" 
                            name="username"
                            value={username} 
                            className="form-control" 
                            placeholder="User Name"
                            autoComplete="autoComplete"
                            required="required" 
                            autoFocus="autofocus"
                            onChange={onChange} 
                        />

                        <label htmlFor="password" className="sr-only">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={password} 
                            className="form-control"
                            autoComplete="new-password"
                            placeholder="Password" 
                            required="required" 
                            onChange={onChange}
                        />
                        {
                            loginError ? <LoginError /> : null
                        }
                        <div className="d-flex justify-content-end">
                            <button 
                                className="btn btn-md btn-primary" 
                                type="submit"
                                disabled={isLoggingIn}
                            >
                                {
                                    isLoggingIn ? <IsFetching /> : 'Sign in'
                                }
                            </button>
                        </div>
                    </form>
                </div>                
                <footer>
                    <p className="text-muted d-flex justify-content-end align-items-end">© {new Date().getFullYear()} <span className="copyright">3Line TMS</span></p>
                </footer>
            </div>
        </div>
    )
}
export default SignIn;