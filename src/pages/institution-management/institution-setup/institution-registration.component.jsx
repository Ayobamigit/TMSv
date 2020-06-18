import React, { useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import Swal from '../../../constants/swal';
import { registerInstitutionURL, allServiceProviders, getBanks } from '../../../Utils/URLs';
import { useHistory } from 'react-router-dom';
import { manipulateNumber } from '../../../Utils/manipulateNumber';

// Context for Authentication
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import IsFetching from '../../../components/isFetching/IsFetching.component';

const InstitutionRegistration = () => {
    const [state, setState ] =  useState({ 
        institutionName: '', 
        institutionEmail: '', 
        settlementAccount: '', 
        institutionPhone: '',
        institutionAppKey: '',
        institutionIntegrationVersion: '',
        institutionURL: '',
        serviceProvidersList: [],
        banks: [],
        settlementBank: '',
        serviceProvider: '',
        feePercentage: '',
        maximumCharge: '',
        minimumCharge: '',
        componentOne: '',
        componentTwo: '',
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
        //Get all service providers
        axios({
            url: `${allServiceProviders}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                'Bearer': authToken
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

        // Get all banks 
        axios({
            url: `${getBanks}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                'Bearer': authToken
            },
            data: {},
            timeout: FetchTimeOut
        })
            .then(result => {
            if(result.data.respCode === '00'){
                setState( state => ({
                    ...state,
                    banks: result.data.respBody
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
        const { institutionName, institutionEmail, settlementAccount, institutionPhone, settlementBank, institutionAppKey, institutionIntegrationVersion, institutionURL, feePercentage, maximumCharge, minimumCharge, componentOne, componentTwo } = state;
        
        const reqBody = {
            institutionName, 
            institutionEmail,              
            settlementAccount, 
            bank: settlementBank,
            globalSettings: false,
            token: authToken,              
            institutionPhone,
            institutionAppKey,
            institutionIntegrationVersion,
            institutionURL,
            createdBy: userName, 
            dateCreated: date, 
            feePercentage: Number(feePercentage),
            maximumCharge,
            minimumCharge,
            component1: componentOne,
            component2: componentTwo,
            serviceProviderName: serviceProviderInfo.providerName        

        };
        
        if (institutionName.trim() === '' || institutionEmail.trim() === '' || institutionPhone.trim() === '' || institutionAppKey.trim() === '' || institutionURL.trim() === '' || institutionIntegrationVersion.trim() === '' || settlementAccount.trim() === '' || settlementBank.trim() === '' || componentOne.trim() ==='' || componentTwo.trim() === '') {
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
                    'Authorization': `Bearer ${authToken}`,
                    'Bearer': authToken
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
                    history.push('/institution-list');
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

    const history = useHistory();
    
    const { IsFetchingData } = state;
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Institution Registration</h1>
            </div>
            <div className="page-content">
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
                                <p>Institution URL</p>
                                <input 
                                    type="url" 
                                    value={state.institutionURL}
                                    name="institutionURL" 
                                    onChange={onChange}
                                    required 
                                    className="form-control" 
                                    placeholder="Institution URL" 
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Institution Integration Version</p>
                                <input 
                                    type="text" 
                                    value={state.institutionIntegrationVersion}
                                    name="institutionIntegrationVersion" 
                                    onChange={onChange}
                                    required 
                                    className="form-control" 
                                    placeholder="Institution Integrated Version" 
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Institution App Key</p>
                                <input 
                                    type="text" 
                                    value={state.institutionAppKey}
                                    name="institutionAppKey" 
                                    onChange={onChange}
                                    required 
                                    className="form-control" 
                                    placeholder="Institution App Key" 
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Choose Settlement Bank</p>
                                    <select className="custom-select" name="settlementBank" value={state.settlementBank} onChange={onChange} required >
                                    <option value="">Select Settlement Bank</option>
                                    {
                                        state.banks ? 
                                        state.banks.map((bank, i) => {
                                            return(
                                                <option 
                                                    value={bank.bankName} 
                                                    key={i}
                                                >
                                                    {bank.bankName}
                                                </option>
                                            )
                                        })
                                        :null
                                    }
                                </select>
                            </div> 
                            <div className="col-md-6">
                                <p>Settlement Account Number</p>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Settlement Account Number" 
                                    value={state.settlementAccount} 
                                    name="settlementAccount"
                                    maxLength="10"
                                    onChange={onChange}  
                                    onKeyPress={(e) => manipulateNumber(e)}                             
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
                                    maxLength="11"
                                    onKeyPress={(e) => manipulateNumber(e)}                             
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
                            <div className="col-md-6">
                                <p>Component One</p>
                                <input 
                                    name="componentOne" 
                                    className="form-control" 
                                    value={state.componentOne} 
                                    onChange={onChange} 
                                    type="text"
                                    minLength="32"
                                    maxLength = "32"
                                    required                                    
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Component Two</p>
                                <input 
                                    name="componentTwo" 
                                    className="form-control" 
                                    value={state.componentTwo} 
                                    onChange={onChange} 
                                    type="text"
                                    minLength="32"
                                    maxLength = "32"
                                    required                                    
                                />
                            </div>
                        
                            <h5 className="text-center col-12 mt-5 mb-3"> Wallet Information</h5>
                            <div className="col-md-6">
                                <p>Charge Percentage (in %)</p>
                                <input 
                                    name="feePercentage" 
                                    className="form-control" 
                                    value={state.feePercentage} 
                                    onChange={onChange}
                                    type="number"
                                    maxLength="2"
                                    min="0"
                                    max="100"
                                    step="0.001"
                                    onKeyPress={(e) => manipulateNumber(e)}
                                    required                                    
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Minimum Charge (in naira)</p>
                                <input 
                                    name="minimumCharge" 
                                    className="form-control" 
                                    value={state.minimumCharge} 
                                    onChange={onChange} 
                                    type="number"
                                    maxLength="5"
                                    onKeyPress={(e) => manipulateNumber(e)}
                                    required                                    
                                />
                            </div> 
                            
                            <div className="col-md-6">
                                <p>Maximum Charge (in naira)</p>
                                <input 
                                    name="maximumCharge" 
                                    className="form-control" 
                                    value={state.maximumCharge} 
                                    onChange={onChange} 
                                    type="number"
                                    maxLength="5"
                                    onKeyPress={(e) => manipulateNumber(e)}
                                    required                                    
                                />
                            </div> 
                        </div>

                        <div className="col-md-12 mt-5 d-flex justify-content-end">
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
            </div>
        </Layout>
    )
}
export default withTimeout(InstitutionRegistration);