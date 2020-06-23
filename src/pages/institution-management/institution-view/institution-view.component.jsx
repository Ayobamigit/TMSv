import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import PreLoader from '../../../components/PreLoader/Preloader.component';
import { viewAnInstitution, getBanks, updateAnInstitution, allServiceProviders } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';

import { FetchTimeOut } from "../../../Utils/FetchTimeout";

import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import IsFetching from '../../../components/isFetching/IsFetching.component';

const {authToken, institution} = JSON.parse(sessionStorage.getItem('userDetails'))

const InstitutionView = () => {
    const history = useHistory();
    const match = useRouteMatch();
    const [state, setState ] =  useState({ 
        id: '',
        institutionName: '', 
        institutionEmail: '', 
        institutionID: '', 
        settlementAccount: '', 
        institutionPhone: '',
        institutionAppKey: '', 
        institutionIntegrationVersion: '', 
        institutionURL: '',
        banks: [],
        settlementBank: '',
        serviceProvider: '',
        componentOne: '',
        componentTwo: '',
        createdBy: '', 
        dateCreated: '',
        IsFetchingData: false
    });
    const [readOnly, setIsReadOnly ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const getDeviceData = () => {
           
            const reqBody = match.params.id
            
           
            axios({
                url: `${viewAnInstitution}`,
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
                        setIsLoading(false)
                
                if (result.data.respCode === '00'){
                    //console.log(result.data.respBody.institutionID)
                  
                    const { 
                        institutionName, institutionEmail, institutionID, settlementAccount, id, institutionPhone, serviceProviders,
                        institutionAppKey, institutionIntegrationVersion, institutionURL, createdBy, dateCreated, bank, component1, component2
                    } = result.data.respBody;
                    setState(state => ({
                        ...state, 
                        institutionName,
                        institutionEmail,
                        institutionID,
                        settlementAccount,
                        id,
                        institutionPhone,
                        serviceProvider: serviceProviders,
                        institutionAppKey, 
                        componentOne: component1,
                        componentTwo: component2,
                        institutionIntegrationVersion, 
                        institutionURL,
                        createdBy,
                        dateCreated,
                        settlementBank: bank,
                        
                    }))
                } else {                    
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${result.data.respDescription}`,
                        footer: 'Please contact support'
                    })
                }                
            })
            .catch(err => {
                setIsLoading(false)
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                    footer: 'Please contact support'
                })
            });
        }
        getDeviceData();

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
    }, [match.params.id])

    const onChange = (e) => {
        setState({
            ...state, 
            [e.target.name]: e.target.value
        })
    }

    const editFields = () => {
        setIsReadOnly(!readOnly)
    }

    const editInstitutionData = (e) => {
        e.preventDefault();
        const { 
            institutionName, institutionEmail, settlementAccount, institutionPhone, createdBy, dateCreated, 
            institutionAppKey, institutionIntegrationVersion, institutionURL, settlementBank, serviceProvider, componentOne, componentTwo,
         } = state;
        const reqBody = {
            institutionName, 
            institutionEmail, 
            settlementAccount, 
            institutionPhone,
            createdBy, 
            dateCreated,
            institutionAppKey, 
            institutionIntegrationVersion, 
            institutionURL,
            bank: settlementBank,
            serviceProviderName: serviceProvider,
            token: authToken,
            component1: componentOne,
            component2: componentTwo,
        };
        if (
                institutionName.trim() === '' || institutionEmail.trim() === '' || settlementAccount.trim() === '' || institutionPhone.trim() === '' || createdBy.trim() === '' || 
                dateCreated.trim() === '' || settlementBank.trim() === '' || serviceProvider.trim() === ''  || 
                institutionAppKey.trim() === ''  || institutionIntegrationVersion.trim() === ''  || institutionURL.trim() === '' || componentOne.trim() === '' || componentTwo.trim() === ''
            ){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'Please fill all fields!'
            })
        } else {
            setState({
                ...state, 
                IsFetchingData: true
            })
            axios({
                url: `${updateAnInstitution}`,
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
                        title: 'Successful Update...',
                        text: 'Institution Update was Successful!'
                    })
                    if(institution){
                        history.push('/dashboard')
                    }else{
                        history.push('/institution-list');
                    }
                   
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

    const { IsFetchingData } = state;
    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                    <h1 className="h2">Institution View</h1>
                    <button className="btn btn-sm btn-primary" onClick={editFields}>Edit Fields</button>
                </div>
                <div className="row page-content">
                    <div className="col-md-12">
                    <form onSubmit={editInstitutionData}>
                        <div className="form-row">
                            <div className="col-md-6">
                                <p>Institution Name</p>
                                <input 
                                    type="text" 
                                    value={state.institutionName}
                                    name="institutionName" 
                                    onChange={onChange}
                                    required
                                    readOnly
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
                                    readOnly={readOnly} 
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
                                    readOnly
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Institution URL</p>
                                <input 
                                    type="url" 
                                    value={state.institutionURL}
                                    name="institutionURL" 
                                    readOnly={readOnly} 
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
                                    readOnly={readOnly} 
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
                                    readOnly={readOnly} 
                                    onChange={onChange}
                                    required 
                                    className="form-control" 
                                    placeholder="Institution App Key" 
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Settlement Account</p>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Settlement Account" 
                                    value={state.settlementAccount} 
                                    name="settlementAccount"
                                    onChange={onChange}
                                    required
                                    readOnly={readOnly}
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
                                    readOnly={readOnly} 
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Choose Settlement Bank</p>
                                    <select className="custom-select mb-4" 
                                    name="settlementBank" 
                                    disabled={readOnly} 
                                    value={state.settlementBank} 
                                    onChange={onChange} 
                                    required >
                                    <option value="">{state.settlementBank}</option>
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
                                <p>Choose Service Provider</p>
                                    <select
                                    className="custom-select mb-4" 
                                    name="serviceProvider" 
                                    disabled={readOnly} 
                                    value={state.serviceProvider} 
                                    onChange={onChange} 
                                    required >
                                    <option value="">{state.serviceProvider.providerName}</option>
                                    {
                                         state.serviceProvidersList ? 
                                         state.serviceProvidersList.map((serviceProvider, i) => {
                                             return(
                                                 <option 
                                                     value={serviceProvider.providerName} 
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
                            {!institution ?
                                <div className="col-md-6">
                                <p>Component One</p>
                                <input 
                                    name="componentOne" 
                                    className="form-control" 
                                    value={state.componentOne} 
                                    onChange={onChange} 
                                    type="text"
                                    disabled={readOnly}
                                    minLength="32"
                                    maxLength = "32"
                                    required                                    
                                />
                                </div>:
                                 
                                <div className="col-md-6">
                                    <p>Component One</p>
                                    <input 
                                        name="componentOne" 
                                        className="form-control" 
                                        value={state.componentOne} 
                                        onChange={onChange} 
                                        type="text"
                                        readOnly
                                        minLength="32"
                                        maxLength = "32"
                                        required                                    
                                    />
                                </div>
                                }
                             {!institution ?
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
                                    disabled={readOnly}                                   
                                />
                                </div> :  
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
                                        readOnly                                   
                                    />
                                </div> 
                             }
                            <div className="col-md-6">
                                <p>Created By</p>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Created By"
                                    value={state.createdBy}
                                    required
                                    readOnly 
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Date Created</p>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Date Created"
                                    value={state.dateCreated}
                                    required
                                    readOnly 
                                />
                            </div> 
                        </div>
                        {
                            readOnly ?
                            null :
                            <div className="form-group">
                                <button 
                                    type="input"
                                    className="btn btn-primary" 
                                    disabled={IsFetchingData}
                                >
                                    {
                                        IsFetchingData ? <IsFetching /> : 'Update'
                                    }
                                </button>
                            </div>
                        } 
                    </form>
            
                    </div>
                </div>
            </Layout>
        )
    }
}
export default withTimeout(InstitutionView);