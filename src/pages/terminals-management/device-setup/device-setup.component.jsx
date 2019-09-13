import React, { useState } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { withRouter } from 'react-router-dom';
import Swal from '../../../constants/swal';
import baseUrl from '../../../constants/baseurl';

const DeviceRegistration = ({history}) => {
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
            terminalID: terminalID,
            terminalROMVersion: terminalROMVersion,
            terminalSerialNo: terminalSerialNo,
            terminalType: terminalType,
            terminalStatus: terminalStatus
        }
        if (terminalID.trim() === '' || terminalType.trim() === '' || terminalStatus.trim() === '' || terminalROMVersion.trim() === '' || terminalSerialNo.trim() === ''){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'Please fill all fields!'
            })
        } else {
            fetch(`${baseUrl}/api/Tms`, {
                method: 'post',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
          .then(response => response.json())
            .then(result => {
                if(result.respCode === '00'){
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
                        text: `${result.respDescription}`,
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
    return (
        <React.Fragment>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Terminals Registration</h1>
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
        </React.Fragment>
    )
}
export default withTimeout(withRouter(DeviceRegistration));