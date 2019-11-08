import React, { useState, useContext } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { useHistory } from 'react-router-dom';
import Swal from '../../../constants/swal';

// Context for Authentication
import { authContext } from '../../../Context/Authentication.context';
import Layout from '../../../components/Layout/layout.component';
import Axios from 'axios';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import { registerTerminalURL } from '../../../Utils/URLs';
import FileUploadModal from './file-upload.component';

const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));

const DeviceRegistration = () => {
    const [state, setState ] =  useState({
        terminalID: '',
        terminalType: '',
        terminalStatus: '',
        terminalROMVersion: '',
        terminalSerialNo: ''
    })
    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    const registerDevice = (e) => {
        e.preventDefault();
        const { terminalID, terminalType, terminalROMVersion, terminalSerialNo, terminalStatus } = state;
        const reqBody = {
            id: 0,
            terminalID,
            dateCreated: new Date(),
            terminalROMVersion,
            terminalSerialNo,
            terminalType,
            terminalStatus
        }
        if (terminalID.trim() === '' || terminalType.trim() === '' || terminalStatus.trim() === '' || terminalROMVersion.trim() === '' || terminalSerialNo.trim() === ''){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'Please fill all fields!'
            })
        } else {
            Axios({
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
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Terminals Registration</h1>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    Upload Excel
                </button>
            </div>
            <div className="row">
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
                            <p>Terminal Status</p>
                            <select className="browser-default custom-select" name="terminalStatus" value={state.terminalStatus} onChange={onChange} required >
                                <option value="" disabled>Choose your option</option>                                
                                <option value="Good">Good</option>
                                <option value="Printer Error">Printer Error</option>
                                <option value="No Paper">No Paper</option>
                                <option value="Network Malfunction">Network Malfunction</option>
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
                            <button 
                                type="input"
                                className="btn btn-primary" 
                            >
                                Create
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