import React, { useState, useCallback, useContext } from 'react';
import './sign-in.styles.scss';
import { authContext } from '../../Context/Authentication.context';

import Logo from '../../img/3line_logo.png';

const SignIn = ({ history }) => { 
    const [ state, setState ] = useState({
        username: '',
        password: ''
    });
    
    const { setAuthenticationStatus } = useContext(authContext)
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        document.querySelector(".btn").disabled = true;
        setAuthenticationStatus(true)
        history.push('/dashboard')
        document.querySelectorAll(".btn").disabled = false;
    }, [history, setAuthenticationStatus])

    const onChange = useCallback((e) => {
        setState({...state, [e.target.name]: e.target.value});
    }, [state])

    
    return (
        <div className="signInContainer">
            <form className="form-signin" onSubmit={onSubmit}>
                <img className="mb-4" src={Logo} alt="" />
                <div className="welcome-text">
                    <h3>Welcome to 3Line Terminal Management System</h3>
                </div>
                
                <h3 className="h3 mb-3 font-weight-normal">Please sign in</h3> <br />
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input 
                    type="text" 
                    name="username"
                    value={state.username} 
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
                    value={state.password} 
                    className="form-control"
                    autoComplete="autoComplete"
                    placeholder="Password" 
                    required="required" 
                    onChange={onChange}
                />
                <button 
                    className="btn btn-md btn-primary btn-block" 
                    type="submit"
                >
                    Sign in
                </button>
                <p className="mt-5 mb-3 text-muted">© {new Date().getFullYear()}</p>
            </form>
        </div>
    )
}
export default SignIn;