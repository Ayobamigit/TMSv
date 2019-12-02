import React, { useState, useContext } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import Swal from '../../../constants/swal';
import { registerInstitutionURL } from '../../../Utils/URLs';
import { useHistory } from 'react-router-dom';

// Context for Authentication
import { authContext } from '../../../Context/Authentication.context';
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import IsFetching from '../../../components/isFetching/IsFetching.component';

const { authToken, userName } = JSON.parse(sessionStorage.getItem('userDetails'))

const InstitutionRegistration = () => {
    const [state, setState ] =  useState({ 
        institutionName: '', 
        institutionEmail: '', 
        institutionID: '', 
        merchantAccount: '', 
        institutionLocation: '', 
        institutionAddress: '',
        institutionPhone: '',
        password: '',
        username: '',
        processorIP: '',
        processorName: '',
        processorPort: '',
        IsFetchingData: false
    });

    //Getting Current Time and Date 
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;

    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }       
    
    const registerInstitution = (e) => {
        e.preventDefault();
        setState({
            ...state, 
            IsFetchingData: true
        })
        const { 
            institutionName, institutionEmail, institutionID, merchantAccount, username,
            institutionLocation, institutionAddress, institutionPhone, password, processorIP, processorName, processorPort
        } = state;
        
        const reqBody = {
            id: '100',
            institutionName, 
            institutionEmail, 
            institutionID, 
            merchantAccount,  
            institutionLocation,  
            institutionAddress, 
            institutionPhone,
            createdBy: userName, 
            dateCreated: dateTime,
            auth_token: authToken,
            password,
            processorIP,
            processorName,
            processorPort,
            username
        };
        if (institutionName.trim() === '' || password.trim() === '' || username.trim() === '' || processorIP.trim() === '' || processorName.trim() === '' || processorPort.trim() === ''
            || institutionEmail.trim() === '' || institutionID.trim() === '' || institutionPhone.trim() === '' || institutionLocation.trim() === '' || institutionAddress.trim() === '') {
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'Please fill all required fields!'
            })
        } else {
            setState({
                ...state, 
                IsFetchingData: true
            })
            axios({
                url: `${registerInstitutionURL}`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                data: reqBody,
                timeout: FetchTimeOut
            })
            .then(result => {
                setState({
                    ...state, 
                    IsFetchingData: false
                })
                if(result.data.respCode === '00'){
                    Swal.fire({
                        type: 'success',
                        title: 'Successful Registration...',
                        text: 'Institution Registration was Successful!'
                    })
                    history.push('/dashboard');
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${result.data.respDescription}`,
                        footer: 'Please contact support'
                    })
                }                
            })
            .catch(err => {
                setState({
                    ...state, 
                    IsFetchingData: false
                })
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                    footer: 'Please contact support'
                })
            });
        }
    }

    const { isAuthenticated } = useContext(authContext);
    const history = useHistory();
    if(!isAuthenticated){
        history.push('/')
    }
    const { IsFetchingData } = state;
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Institution Registration</h1>
            </div>
            <div className="row">
                <div className="col-md-12">
                <form onSubmit={registerInstitution}>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Institution Name</p>
                            <input 
                                type="text" 
                                value={state.institutionName}
                                name="institutionName" 
                                onChange={onChange}
                                required 
                                className="form-control" 
                                placeholder="Institution Name" 
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Institution Email</p>
                            <input 
                                type="text" 
                                value={state.institutionEmail}
                                name="institutionEmail" 
                                onChange={onChange}
                                required                                 
                                className="form-control" 
                                placeholder="Institution Email" 
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Institution ID</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Institution ID" 
                                value={state.institutionID} 
                                name="institutionID"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant Account <small>(Optional Field)</small></p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Merchant Account" 
                                value={state.merchantAccount} 
                                name="merchantAccount"
                                onChange={onChange}                               
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Institution Location</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Institution Location" 
                                value={state.institutionLocation} 
                                name="institutionLocation"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Institution Address</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Institution Address" 
                                value={state.institutionAddress} 
                                name="institutionAddress"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Institution Phone</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Institution Phone"
                                value={state.institutionPhone} 
                                name="institutionPhone"
                                onChange={onChange}
                                required                                 
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Username</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Assign a Username"
                                value={state.username} 
                                name="username"
                                onChange={onChange}
                                required                                 
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Password</p>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Password"
                                value={state.password} 
                                name="password"
                                onChange={onChange}
                                required                                 
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Processor Name</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Processor Name"
                                value={state.processorName} 
                                name="processorName"
                                onChange={onChange}
                                required                                 
                            />
                        </div> 
                        <div className="col-md-6">
                            <p>Processor IP</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Processor IP"
                                value={state.processorIP} 
                                name="processorIP"
                                onChange={onChange}
                                required                                 
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Processor Port</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Processor Port"
                                value={state.processorPort} 
                                name="processorPort"
                                onChange={onChange}
                                required                                 
                            />
                        </div>   
                    </div>
                    <div className="form-group">
                        <button 
                            type="input"
                            className="btn btn-primary" 
                            disabled={IsFetchingData}
                        >
                            {
                                IsFetchingData ? <IsFetching /> : 'Create'
                            }
                        </button>
                    </div>
                    
                </form>
        
                </div>
            </div>
        </Layout>
    )
}
export default withTimeout(InstitutionRegistration);