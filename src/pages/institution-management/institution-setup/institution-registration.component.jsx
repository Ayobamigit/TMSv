import React, { useState, useContext, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import Swal from '../../../constants/swal';
import { registerInstitutionURL, allServiceProviders } from '../../../Utils/URLs';
import { useHistory } from 'react-router-dom';

// Context for Authentication
import { authContext } from '../../../Context/Authentication.context';
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import IsFetching from '../../../components/isFetching/IsFetching.component';

const InstitutionRegistration = () => {
    const [state, setState ] =  useState({ 
        institutionName: '', 
        institutionEmail: '', 
        settlementAccount: '', 
        institutionAddress: '',
        institutionPhone: '',
        serviceProvidersList: [],
        serviceProvider: '',
        IsFetchingData: false
    });
    const [serviceProviderInfo, setServiceProviderInfo] = useState({})

    //Getting Current Time and Date 
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const { authToken, userName } = JSON.parse(sessionStorage.getItem('userDetails'))

    const onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setState({...state, [e.target.name]: e.target.value})
        if(name === 'serviceProvider'){
            let result = state.serviceProvidersList.find((element) => {
                return element.id === Number(value)
            })
            setServiceProviderInfo(result)
        }
    }    
    
    useEffect(() => {
        axios({
            url: `${allServiceProviders}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            data: {},
            timeout: FetchTimeOut
        })
            .then(result => {
            if(result.data.respCode === '00'){
                setState( state => ({
                    ...state,
                    serviceProvidersList: result.data.respBody
                }))
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
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `${err}`,
                footer: 'Please contact support'
            })
        });
    }, [authToken])
    
    const registerInstitution = (e) => {
        e.preventDefault();
        setState({
            ...state, 
            IsFetchingData: true
        })
        const { institutionName, institutionEmail, settlementAccount, institutionAddress, institutionPhone } = state;
        
        const reqBody = {
            institutionName, 
            institutionEmail,              
            settlementAccount,               
            // institutionAddress, 
            institutionPhone,
            createdBy: userName, 
            dateCreated: date, 
            serviceProviderName: serviceProviderInfo.providerName        

        };
        if (institutionName.trim() === '' || institutionEmail.trim() === '' || institutionPhone.trim() === '' || institutionAddress.trim() === '' || settlementAccount.trim() === '') {
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
                console.log(result.data)
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
                            <p>Name</p>
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
                            <p>Email</p>
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
                            <p>Settlement Account Number</p>
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Settlement Account Number" 
                                value={state.settlementAccount} 
                                name="settlementAccount"
                                onChange={onChange}                               
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Address</p>
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
                            <p>Phone Number</p>
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
                            <p>Choose Service Provider</p>
                                <select className="custom-select" name="serviceProvider" onChange={onChange} required >
                                <option value="">Select Service Provider</option>
                                {
                                    state.serviceProvidersList ? 
                                    state.serviceProvidersList.map((serviceProvider, i) => {
                                        return(
                                            <option 
                                                value={serviceProvider.id} 
                                                key={i}
                                            >
                                                {serviceProvider.providerName}
                                            </option>
                                        )
                                    })
                                    :null
                                }
                            </select>
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