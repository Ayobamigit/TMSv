import React, { useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import PreLoader from '../../../components/PreLoader/Preloader.component';
import Swal from '../../../constants/swal';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { viewATerminal, updateATerminal, getProfilesByServiceProviderName, allInstitutions } from '../../../Utils/URLs';
import { FetchTimeOut } from '../../../Utils/FetchTimeout'

import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import IsFetching from '../../../components/isFetching/IsFetching.component';

const DeviceView = () => {
    const history = useHistory();
    const match = useRouteMatch();
    const [state, setState ] =  useState({
        terminalID: '',
        terminalType: '',
        terminalStatus: 'good',
        terminalROMVersion: '',
        terminalSerialNo: '',
        institution: '',
        serviceProvider: '',
        profile: '',
        selectedProfileName: '', 
        dateCreated: '',
        institutionsList:[],
        profilesList:[],
        IsFetchingData: false
    });
    const [readOnly, setIsReadOnly ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);
    const {authToken, institution } = JSON.parse(sessionStorage.getItem('userDetails'));

    useEffect(() => {
        const getDeviceData = () => {
           
            const reqBody = match.params.id

            if (institution){
                
                axios({
                    method: 'post',
                    url: `${viewATerminal}`,
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
                    if(result.data.respCode === '00'){
                        const { terminalID, terminalType, terminalStatus, terminalROMVersion, terminalSerialNo, profile, dateCreated } = result.data.respBody;
                        setState(state => ({...state, 
                            terminalID,
                            terminalType,
                            terminalStatus,
                            terminalROMVersion,
                            terminalSerialNo,
                            institution,
                            serviceProvider: institution.serviceProviders.providerName,
                            profile,
                            selectedProfileName: profile.profileName,
                            dateCreated
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
                    setIsLoading(false)
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${err}`,
                        footer: 'Please contact support'
                    })
                });

                
            }

            else{
               
                axios({
                    method: 'post',
                    url: `${viewATerminal}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                        'Bearer': authToken
                    },
                    data: reqBody,
                    timeout: FetchTimeOut
                })
                .then(result => {console.log(result.data)
                    setIsLoading(false)
                    if(result.data.respCode === '00'){
                        const { terminalID, terminalType, terminalStatus, terminalROMVersion, terminalSerialNo, institution, institution:{serviceProviders: {providerName}}, profile, dateCreated } = result.data.respBody;
                        setState(state => ({...state, 
                            terminalID,
                            terminalType,
                            terminalStatus,
                            terminalROMVersion,
                            terminalSerialNo,
                            institution,
                            serviceProvider: providerName,
                            profile,
                            selectedProfileName: profile.profileName,
                            dateCreated
                        }))
                  console.log(profile) }else{
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
            
        }

        // get all institution

        if(!institution){
            axios({
                url: `${allInstitutions}`,
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
    
        }

        getDeviceData();
       
    }, [match.params.id, authToken, institution])

    const getProfilesByName = () => {

            axios({
                url: `${getProfilesByServiceProviderName}`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                    'Bearer': authToken
                },
                data: state.institution.institutionName,
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
    
    const onChange = (e) => {
        let {target: {name, value}} = e;
        setState({
            ...state, 
            [name]: value
        });
    }

    const updateProfile = ({target}) => {
        const profile = state.profilesList.find(profile => profile.profileName === target.value);
        setState({...state, profile, selectedProfileName: profile.profileName })
;    }
    

    const editFields = () => {
        setIsReadOnly(!readOnly)
        getProfilesByName()
    }

    const editDeviceData = (e) => {
        e.preventDefault();
        const { terminalID, terminalType, terminalROMVersion, terminalSerialNo, institution, dateCreated, profile} = state;
        const reqBody = {
            terminalID,
            dateCreated,
            terminalROMVersion,
            terminalSerialNo,
            terminalType,
            institution,
            profile
        }
       
        if (terminalID.trim() === '' || terminalType.trim() === '' || terminalROMVersion.trim() === '' || terminalSerialNo.trim() === ''){
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
                data: reqBody,
                url: `${updateATerminal}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                    'Bearer': authToken
                },
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
                        text: 'Terminal Update was Successful!'
                    })
                    history.push('/device-list');
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Failed to get device data...',
                        text: `${result.data.respDescription}`
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
                    <h1 className="h2">Terminal</h1>
                    <button className="btn btn-sm btn-primary" onClick={editFields}>Edit Fields</button>
                </div>
                <div className="row page-content">
                    <div className="col-md-12">
                        <form onSubmit={editDeviceData}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <p>Terminal Id</p>
                                    <input 
                                        name="terminalID" 
                                        className="form-control" 
                                        value={state.terminalID} 
                                       
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <p>Terminal Type</p>
                                    <select className="browser-default custom-select" name="terminalType" value={state.terminalType} onChange={onChange} required disabled={readOnly} >
                                        <option value="" disabled>Choose your option</option>                                
                                        <option value="justTide">justTide</option>
                                        <option value="PAX">PAX</option>
                                        <option value="TELPO">TELPO</option>
                                        <option value="Topwise">Topwise</option>
                                    </select>
                                </div>

                                {/* Hardcoded Values */}
                                <div className="form-group col-md-6">
                                    <p>Terminal Status</p>
                                    <select className="browser-default custom-select" name="terminalStatus" value={state.terminalStatus} onChange={onChange} required disabled >
                                        <option value="" disabled>Choose your option</option>                                
                                        <option value="Good">Good</option>
                                        <option value="Printer Error">Printer Error</option>
                                        <option value="No Paper">No Paper</option>
                                        <option value="Network Malfunction">Network Malfunction</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <p>Battery Percentage</p>
                                    <input 
                                        name="terminalROMVersion" 
                                        className="form-control" 
                                        value="87%" 
                                        
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <p>Paper Level</p>
                                    <input 
                                        name="terminalROMVersion" 
                                        className="form-control" 
                                        value="56%" 
                                        
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <p>Terminal Location</p>
                                    <input 
                                        name="terminalROMVersion" 
                                        className="form-control" 
                                        value={state.terminalID === '2101CX82' ? 'Banana Island, Lagos.' : '7a Idejo Street, Lagos.'} 
                                        
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <p>Number of Applications Installed</p>
                                    <input 
                                        name="terminalROMVersion" 
                                        className="form-control" 
                                        value="6" 
                                        
                                        required
                                        readOnly
                                    />
                                </div>

                                {/* Hardcoded Values */}

                                <div className="form-group col-md-6">
                                    <p>Terminal Version</p>
                                    <input 
                                        name="terminalROMVersion" 
                                        className="form-control" 
                                        value={state.terminalROMVersion} 
                                        onChange={onChange} 
                                        required
                                        disabled={readOnly}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <p>Terminal App Version</p>
                                    <input 
                                        name="terminalSerialNo" 
                                        className="form-control" 
                                        value={state.terminalSerialNo} 
                                        onChange={onChange}
                                        required 
                                        disabled={readOnly}
                                    />
                                </div>  
                                <div className="form-group col-md-6">
                                    <p>Institution</p>
                                    <input 
                                        name="institution" 
                                        className="form-control" 
                                        value={state.institution.institutionName}
                                        
                                        required 
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <p>Service Provider</p>
                                    <input 
                                        name="serviceProvider" 
                                        className="form-control" 
                                        value={state.serviceProvider} 
                                       
                                        required 
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <p>Profile</p>
                                    <select 
                                        name="profile" 
                                        className="form-control" 
                                        value={state.selectedProfileName} 
                                        onChange={updateProfile}
                                        required 
                                        disabled={readOnly}
                                    >
                                        <option value="" selected disable>{state.profile.profileName}</option>
                                
                                    {
                                        state.profilesList ? 
                                        state.profilesList.map((profile, i) => {
                                            return(
                                                <option 
                                                    value= {profile.profileName}
                                                    key={i}
                                                >
                                                    {profile.profileName}
                                                </option>
                                            )
                                        }): null
                                    }
                                    </select>
                                </div>
                                {
                                    readOnly ?
                                    null :
                                    <div className="form-group col-md-12">
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
                            </div>            
                        </form>
                    </div>
                </div>
            </Layout>
        )
    }
}
export default withTimeout(DeviceView);