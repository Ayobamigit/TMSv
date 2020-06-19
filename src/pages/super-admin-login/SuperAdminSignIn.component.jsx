import React, { useState, useContext, useEffect } from 'react';
import '../sign-in/sign-in.styles.scss';
import axios from 'axios';
import { authContext } from '../../Context/Authentication.context';
import { superAdminLoginUrl } from '../../Utils/URLs';
import { FetchTimeOut } from "../../Utils/FetchTimeout";

import Logo from '../../img/logo.png';
import IsFetching from '../../components/isFetching/IsFetching.component';
import LoginError from '../../components/LoginError/LoginError.component';

const AdminSignIn = ({ history }) => { 
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
            let reqBody = {
                username,
                password
            }
            // console.log(superAdminLoginUrl, 'superAdminLoginUrl');
            axios({
                method: 'post',
                headers: {
                    'Content-Type' : 'application/json'
                },
                url: `${superAdminLoginUrl}`,
                data: reqBody,
                timeout: FetchTimeOut
            })
            .then(response => {
                setState({ ...state, isLoggingIn: false })
                if (response.data.respCode === '00') {
                    setAuthenticationStatus(true)
                    const {token, role} = response.data.respBody;
                    sessionStorage.setItem('userDetails', JSON.stringify({
                        authToken: token,
                        userName: state.username.toUpperCase(),
                        role,
                    }))
                    // console.log(role)
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
                alert(e)
            })
        }
    }

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value, loginError: false });
    }

    const { username, password, isLoggingIn, loginError } = state;
    return (
        <div className="signInContainerWrapper">
            <div className="signInContainer">
                <form onSubmit={onSubmit}>
                    <img className="mb-4" src={Logo} alt="" />
                    <div className="welcome-text">
                        <h3>Welcome to 3Line Terminal Management System</h3>
                        <br />
                        <h5>(Super Admin)</h5>
                    </div>
                    
                    <h3 className="h3 mb-3 font-weight-normal">Please sign in</h3> <br />
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
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

                    <label htmlFor="inputPassword" className="sr-only">Password</label>
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
                        disabled={isLoggingIn}
                        onClick={onSubmit}
                    >
                        {
                            isLoggingIn ? <IsFetching /> : 'Sign in'
                        }
                    </button>
                    <p className="mt-5 mb-3 text-muted">© {new Date().getFullYear()}</p>
                </form>
            </div>
        </div>
    )
}
export default AdminSignIn;