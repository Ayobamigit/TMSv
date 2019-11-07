import React, { useState, useContext, useEffect } from 'react';
import './sign-in.styles.scss';
import axios from 'axios';
import { authContext } from '../../Context/Authentication.context';
import { institutionLoginUrl } from '../../Utils/URLs';
import { FetchTimeOut } from '../../Utils/FetchTimeout'

import Logo from '../../img/3line_logo.png';
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
    }, [])
    const { setAuthenticationStatus } = useContext(authContext)
    const onSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            alert('Please Fill all fields')
        } else {
            setState({ ...state, isLoggingIn: true, loginError: false})
            let id = e.target.id;
            document.getElementById(id).disabled = true;
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
                document.getElementById(id).disabled = false;
                if (response.data.respCode === '00') {
                    setAuthenticationStatus(true)
                    sessionStorage.setItem('userDetails', JSON.stringify({
                        authToken: response.data.respBody.authToken,
                        userName: state.username.toUpperCase()
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
                document.getElementById(id).disabled = false;
            })
        }
    }

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value, loginError: false });
    }

    const { username, password, isLoggingIn, loginError } = state;
    return (
        <div className="signInContainer">
            <form className="form-signin" onSubmit={onSubmit}>
                <img className="mb-4" src={Logo} alt="" />
                <div className="welcome-text">
                    Welcome to 3Line Terminal Management System
                </div>
                
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
                <button 
                    className="btn btn-md btn-primary btn-block" 
                    id="loginButton"
                    type="submit"
                    onClick={onSubmit}
                >
                    {
                        isLoggingIn ? <IsFetching /> : 'Sign in'
                    }
                </button>
            </form>
            <p className="mt-5 mb-3 text-muted">© {new Date().getFullYear()}</p>
        </div>
    )
}
export default SignIn;