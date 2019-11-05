import React, { useState, useContext } from 'react';
import './SuperAdminSignIn.styles.scss';
import axios from 'axios';
import { authContext } from '../../Context/Authentication.context';
import { superAdminLoginUrl } from '../../Utils/URLs';

import Logo from '../../img/3line_logo.png';
import IsFetching from '../../components/isFetching/IsFetching.component';

const AdminSignIn = ({ history }) => { 
    const [ state, setState ] = useState({
        username: '',
        password: '',
        isLoggingIn: false
    });
    const { setAuthenticationStatus } = useContext(authContext)
    const onSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            alert('Please Fill all fields')
        } else {
            setState({ ...state, isLoggingIn: true})
            let id = e.target.id;
            document.getElementById(id).disabled = true;
            let reqBody = {
                username,
                password
            }

            axios({
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                url: `${superAdminLoginUrl}`,
                data: reqBody
            })
            .then(response => {
                setState({ ...state, isLoggingIn: false })
                document.getElementById(id).disabled = false;
                if (response.data.respCode === '00') {
                    setAuthenticationStatus(true)
                    history.push('/dashboard')
                } else {
                    setAuthenticationStatus(false);
                    alert(response.data.respDescription)
                } 
            })
            .catch(e => {
                setState({ ...state, isLoggingIn: false })
                document.getElementById(id).disabled = false;
                alert(e)
            })
        }
    }

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const { username, password, isLoggingIn } = state;
    return (
        <div className="signInContainer">
            <form className="form-signin" onSubmit={onSubmit}>
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
                <p className="mt-5 mb-3 text-muted">© {new Date().getFullYear()}</p>
            </form>
        </div>
    )
}
export default AdminSignIn;