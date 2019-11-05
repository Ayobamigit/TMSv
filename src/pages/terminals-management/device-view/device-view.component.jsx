import React, { useState, useEffect, useContext } from 'react';
// import { useHttp } from '../../../CustomHooks/useHttp.hooks';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import PreLoader from '../../../components/PreLoader/Preloader.component';
import Swal from '../../../constants/swal';
import { useHistory, useRouteMatch } from 'react-router-dom';
import baseUrl from '../../../constants/baseurl';

// Context for Authentication
import { authContext } from '../../../Context/Authentication.context';
import Layout from '../../../components/Layout/layout.component';

const history = useHistory();
const match = useRouteMatch();

const DeviceView = () => {
    const [state, setState ] =  useState({
        terminalID: '',
        terminalType: '',
        terminalStatus: '',
        terminalROMVersion: '',
        terminalSerialNo: ''
    });
    const [readOnly, setIsReadOnly ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const getDeviceData = () => {
            fetch(`${baseUrl}/api/Tms/${match.params.id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
          .then(response => response.json())
            .then(result => {
                setIsLoading(false)
                if(result.respCode === '00'){
                    const { terminalID, terminalType, terminalStatus, terminalROMVersion, terminalSerialNo } = result.respBody;
                    setState(state => ({...state, 
                        terminalID,
                        terminalType,
                        terminalStatus,
                        terminalROMVersion,
                        terminalSerialNo
                    }))
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
    }, [])

    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const editFields = () => {
        setIsReadOnly(!readOnly)
    }

    const editDeviceData = (e) => {
        e.preventDefault();
        const { terminalID, terminalType, terminalROMVersion, terminalSerialNo, terminalStatus } = state;
        const reqBody = {
            id: match.params.id,
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
            fetch(`${baseUrl}/api/Tms/${match.params.id}`, {
                method: 'put',
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
                        title: 'Successful Update...',
                        text: 'Terminal Update was Successful!'
                    })
                    history.push('/dashboard');
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Failed to get device data...',
                        text: `${result.respDescription}`
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
    if(!isAuthenticated){
        history.push('/')
    }
    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Terminals View</h1>
                    <button className="btn btn-sm btn-primary" onClick={editFields}>Edit Fields</button>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={editDeviceData}>
                            <div className="form-group">
                                <p>Terminal Id</p>
                                <input 
                                    name="terminalID" 
                                    className="form-control" 
                                    value={state.terminalID} 
                                    onChange={onChange}
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className="form-group">
                                <p>Terminal Type</p>
                                <select className="browser-default custom-select" name="terminalType" value={state.terminalType} onChange={onChange} required disabled={readOnly} >
                                    <option value="" disabled>Choose your option</option>                                
                                    <option value="justTide">justTide</option>
                                    <option value="PACS">PACS</option>
                                    <option value="TELPO">TELPO</option>
                                    <option value="Topwise">Topwise</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <p>Terminal Status</p>
                                <select className="browser-default custom-select" name="terminalStatus" value={state.terminalStatus} onChange={onChange} required disabled={readOnly} >
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly}
                                />
                            </div>  
                            {
                                readOnly ?
                                null :
                                <div className="form-group">
                                    <button 
                                        type="input"
                                        className="btn btn-primary" 
                                    >
                                        Update
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
export default withTimeout(DeviceView);