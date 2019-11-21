import React, { useState, useEffect, useContext } from 'react';
// import { useHttp } from '../../../CustomHooks/useHttp.hooks';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import PreLoader from '../../../components/PreLoader/Preloader.component';
import Swal from '../../../constants/swal';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { viewATerminal } from '../../../Utils/URLs';
import { FetchTimeOut } from '../../../Utils/FetchTimeout'

// Context for Authentication
import { authContext } from '../../../Context/Authentication.context';
import Layout from '../../../components/Layout/layout.component';
import Axios from 'axios';
import IsFetching from '../../../components/isFetching/IsFetching.component';
const {authToken} = JSON.parse(sessionStorage.getItem('userDetails'))

const DeviceView = () => {
    const history = useHistory();
    const match = useRouteMatch();
    const [state, setState ] =  useState({
        terminalID: '',
        terminalType: '',
        terminalStatus: '',
        terminalROMVersion: '',
        terminalSerialNo: '',
        IsFetchingData: false
    });
    const [readOnly, setIsReadOnly ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const getDeviceData = () => {
            Axios({
                method: 'get',
                url: `${`${viewATerminal}`}/${match.params.id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                data: {},
                timeout: FetchTimeOut
            })
            .then(result => {
                setIsLoading(false)
                if(result.data.respCode === '00'){
                    const { terminalID, terminalType, terminalStatus, terminalROMVersion, terminalSerialNo } = result.data.respBody;
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
    }, [match.params.id])
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
            terminalID,
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
            setState({
                ...state, 
                IsFetchingData: true
            })
            Axios({
                method: 'put',
                data: reqBody,
                url: `${`${viewATerminal}`}/${match.params.id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
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
                    history.push('/dashboard');
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

    const { isAuthenticated } = useContext(authContext);
    if(!isAuthenticated){
        history.push('/')
    }
    const { IsFetchingData } = state;
    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Terminal</h1>
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
export default withTimeout(DeviceView);