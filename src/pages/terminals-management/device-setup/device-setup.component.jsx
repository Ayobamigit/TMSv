import React, { useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { useHistory } from 'react-router-dom';
import Swal from '../../../constants/swal';
import { getProfilesByServiceProviderName, allInstitutions } from '../../../Utils/URLs';
import './device-setup.styles.scss';

// Context for Authentication
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import { registerTerminalURL } from '../../../Utils/URLs';
import FileUploadModal from './file-upload.component';
import IsFetching from '../../../components/isFetching/IsFetching.component';

const DeviceRegistration = () => {
    const [state, setState ] =  useState({
        terminalID: '',
        terminalType: '',
        terminalROMVersion: '',
        terminalSerialNo: '',
        serviceProviderId: '',
        profilesList: [],
        institutionsList: [],
        // institution: '',
        institutionId: '',
        profileName: '',
        IsFetchingData: false
    });

    const history = useHistory();
   
    const { authToken, institution } = JSON.parse(sessionStorage.getItem('userDetails'));

    useEffect(() => {
        //Get All institutions

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
         // Get profileName if logged in as in institution

        if(institution){
            // result = state.institutionsList.find((element) => {
            //     return element.institutionName === institution.institutionName
            // })
            setState({
                ...state,
                profilesList: institution.serviceProviders.profile,
                
            })
           
        }
        
    }, [authToken])

   

    const getProfilesByName = (name) => {
        if(!name){
            return;
        }
        


            let result = state.institutionsList.find((element) => {
                return element.institutionName === name
            })
            
            setState({
                ...state,
                institutionId: result.institutionID,
                institution: result.institutionName
            })

            axios({
                url: `${getProfilesByServiceProviderName}`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                    'Bearer': authToken
                },
                data: name,
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
        setState({
            ...state, 
            [e.target.name]: e.target.value
        })
        if(name === 'institution'){
            getProfilesByName(value);
        }
    }
    const registerDevice = (e) => {
        e.preventDefault();

        if(institution){

            const { terminalID, terminalType, terminalROMVersion, terminalSerialNo, profileName} = state;
            const reqBody = {
                terminalID,
                dateCreated: new Date(),
                terminalROMVersion,
                terminalSerialNo,
                terminalType,
                institutionID: institution.institutionID,
                profileName
            }
        
            if (terminalID.trim() === '' || terminalType.trim() === '' || terminalROMVersion.trim() === '' || terminalSerialNo.trim() === '' ){
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
                            text: 'Terminal Registration was Successful!'
                        })
                        history.push('/device-list');
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
        else{

            const { terminalID, terminalType, terminalROMVersion, terminalSerialNo, profileName, institutionId } = state;
            const reqBody = {
                terminalID,
                dateCreated: new Date(),
                terminalROMVersion,
                terminalSerialNo,
                terminalType,
                institutionID: institutionId,
                profileName
            }

            if (terminalID.trim() === '' || terminalType.trim() === '' || terminalROMVersion.trim() === '' || terminalSerialNo.trim() === '' || institutionId.trim() === ''){
                Swal.fire({
                    type: 'info',
                    title: 'Oops...',
                    text: 'Please fill all fields!'
                })
            } 
            
            else {
                setState({
                    ...state, 
                    IsFetchingData: true
                })
                axios({
                    method: 'post',
                    url: `${registerTerminalURL}`,
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
                            text: 'Terminal Registration was Successful!'
                        })
                        history.push('/device-list');
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
        
    }
    
    const { IsFetchingData, profileName } = state;
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
                                minLength = '8'
                                maxLength = '8'
                            />
                        </div>
                        <div className="form-group">
                            <p>Terminal Type</p>
                            <select className="browser-default custom-select" name="terminalType" value={state.terminalType} onChange={onChange} required >
                                <option value="" disabled>Choose your option</option>                                
                                <option value="PAX">PAX</option>
                                <option value="TELPO">TELPO</option>
                                <option value="TOPWISE">TOPWISE</option>
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
                        {// Institutions don't have to select themselves

                            !institution?
                            <div className="form-group">
                            <p>Select Institution</p>
                                <select className="custom-select" name="institution" value={institution} onChange={onChange} required >
                                    <option value="">Select Institution</option>
                                    {
                                        state.institutionsList ? 
                                        state.institutionsList.map((institution, i) => {
                                            return(
                                                <option 
                                                    value= {institution.institutionName}
                                                    key={i}
                                                >
                                                    {institution.institutionName}
                                                </option>
                                            )
                                        })
                                        :null
                                    }
                                </select>
                        </div>:
                        null
                        }
                        
                     
                            <div className="form-group">
                            <p>Select Profiles</p>  
                            <select className="custom-select" name="profileName" value={profileName} onChange={onChange} required >
                                <option value="">Select Profile</option>
                                
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