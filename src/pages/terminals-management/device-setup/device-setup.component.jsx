import React, { useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { useHistory } from 'react-router-dom';
import Swal from '../../../constants/swal';
import { allServiceProviders, getProfilesByServiceProviderId, allInstitutions } from '../../../Utils/URLs';

// Context for Authentication
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import { registerTerminalURL } from '../../../Utils/URLs';
import FileUploadModal from './file-upload.component';
import IsFetching from '../../../components/isFetching/IsFetching.component';

const DeviceRegistration = () => {
    const [state, setState ] =  useState({
        terminalID: '2058',
        terminalType: '',
        terminalROMVersion: '',
        terminalSerialNo: '',
        serviceProvidersList: [],
        serviceProviderId: '',
        profilesList: [],
        institutionsList: [],
        institutionId: '',
        profileName: '',
        IsFetchingData: false
    });

    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));

    useEffect(() => {
        //Get All institutions
        axios({
            url: `${allInstitutions}`,
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
                    institutionsList: result.data.respBody
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

        //Get Service Providers
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
    }, [state.serviceProviderId, authToken])

    const getProfilesById = (id) => {
        if(!id){
            return;
        }
        axios({
            url: `${getProfilesByServiceProviderId}`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            data: id,
            timeout: FetchTimeOut
        })
            .then(result => {
            if(result.data.respCode === '00'){
                setState( state => ({
                    ...state,
                    profilesList: result.data.respBody
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
    }

    const onChange = async (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setState({...state, [e.target.name]: e.target.value})
        if(name === 'serviceProviderId'){
            getProfilesById(value);
        }
    }
    const registerDevice = (e) => {
        e.preventDefault();
        const { terminalID, terminalType, terminalROMVersion, terminalSerialNo, profileName, institutionId } = state;
        const reqBody = {
            terminalID,
            dateCreated: new Date(),
            terminalROMVersion,
            terminalSerialNo,
            terminalType,
            institutionID: institutionId,
            // institutionID: serviceProviderId,
            profileName
        }
        if (terminalID.trim() === '' || terminalType.trim() === '' || terminalROMVersion.trim() === '' || terminalSerialNo.trim() === '' || institutionId.trim() === ''){
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
                method: 'post',
                url: `${registerTerminalURL}`,
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
                        text: 'Terminal Registration was Successful!'
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
    const history = useHistory();
    
    const { IsFetchingData, serviceProviderId, profileName, institutionId } = state;
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Terminals Registration</h1>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    Upload Excel
                </button>
            </div>
            <div className="row page-content">
                <div className="col-md-6">
                    <form onSubmit={registerDevice}>
                        <div className="form-group">
                            <p>Terminal Id</p>
                            <input 
                                name="terminalID" 
                                className="form-control" 
                                value={state.terminalID} 
                                onChange={onChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <p>Terminal Type</p>
                            <select className="browser-default custom-select" name="terminalType" value={state.terminalType} onChange={onChange} required >
                                <option value="" disabled>Choose your option</option>                                
                                <option value="justTide">justTide</option>
                                <option value="PACS">PACS</option>
                                <option value="TELPO">TELPO</option>
                                <option value="Topwise">Topwise</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <p>Terminal Version</p>
                            <input 
                                name="terminalROMVersion" 
                                className="form-control" 
                                value={state.terminalROMVersion} 
                                onChange={onChange} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <p>Terminal App Version</p>
                            <input 
                                name="terminalSerialNo" 
                                className="form-control" 
                                value={state.terminalSerialNo} 
                                onChange={onChange}
                                required 
                            />
                        </div> 
                        <div className="form-group">
                            <p>Select Institution</p>
                                <select className="custom-select" name="institutionId" value={institutionId} onChange={onChange} required >
                                <option value="">Select Institution</option>
                                {
                                    state.institutionsList ? 
                                    state.institutionsList.map((institution, i) => {
                                        return(
                                            <option 
                                                value={institution.institutionID} 
                                                key={i}
                                            >
                                                {institution.institutionName}
                                            </option>
                                        )
                                    })
                                    :null
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <p>Choose Service Provider</p>
                                <select className="custom-select" name="serviceProviderId" value={serviceProviderId} onChange={onChange} required >
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
                        {
                            <div className="form-group">
                            <p>Select Profile</p>
                                <select className="custom-select" name="profileName" value={profileName} onChange={onChange} required >
                                <option value="">Select Profile</option>
                                {
                                    state.profilesList ? 
                                    state.profilesList.map((profile, i) => {
                                        return(
                                            <option 
                                                value={profile.profileName} 
                                                key={i}
                                            >
                                                {profile.profileName}
                                            </option>
                                        )
                                    })
                                    :null
                                }
                            </select>
                        </div>
                        }               
                        <div className="form-group d-flex justify-content-end">
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

            {/* MODAL */}
            <FileUploadModal />
        </Layout>
    )
}
export default withTimeout(DeviceRegistration);