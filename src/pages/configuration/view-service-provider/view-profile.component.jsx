import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getProfileById, editProfile } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import Layout from '../../../components/Layout/layout.component';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import IsFetching from '../../../components/isFetching/IsFetching.component';

const ViewProfile = () => {
    const [state, setState] = useState({
        profileIP: '',
        profileName: '',
        profileZPK: '',
        profilePort: '',
        isLoading: false
    })
    const [readOnly, setIsReadOnly ] = useState(true);
    const onChange = (e) => {
        setState({
            ...state, 
            [e.target.name]: e.target.value
        })
    }
    const history = useHistory();
    const match = useRouteMatch();
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));

    useEffect(() => {
        axios({
            url: `${getProfileById}/${match.params.id}`,
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
                const { profileIP, profileName, port, zpk} = result.data.respBody;
                setState(state =>({
                    ...state, 
                    profileIP,
                    profileName,
                    profileZPK: zpk,
                    profilePort: port
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
    }, [authToken, match.params.id])

    const updateProfile = (e) => {
        e.preventDefault();
        setState({
            ...state, 
            isLoading: true
        })
        const { profileIP, profileName, profilePort, profileZPK } = state;
        let reqBody = {
            id: match.params.id,
            port: profilePort,
            profileAddress: profileIP,
            profileName,
            zpk: profileZPK
        }
        axios({
            url: `${editProfile}/${match.params.id}`,
            method: 'put',
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
                isLoading: false
            })
            if(result.data.respCode === '00'){
                Swal.fire({
                    type: 'success',
                    title: 'Successful Update...',
                    text: 'Profile Update was Successful!'
                })
                history.goBack();  
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
                isLoading: false
            })
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `${err}`,
                footer: 'Please contact support'
            })
        });
    }
    const editFields = () => {
        setIsReadOnly(!readOnly)
    }
    const { profilePort, profileName, profileIP, profileZPK, isLoading } = state;
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Profile View</h1>
                <button className="btn btn-sm btn-primary" onClick={editFields}>Edit Fields</button>
            </div>
            <div className="row page-content">
                <div className="col-md-6">
                    <form onSubmit={updateProfile}>
                        <div className="form-row">
                            <div className="col-md-12">
                                <p>Profile Name</p>
                                <input 
                                    type="text" 
                                    value={profileName}
                                    name="profileName"
                                    onChange={onChange}
                                    required
                                    readOnly={readOnly} 
                                    className="form-control" 
                                    placeholder="Profile Name" 
                                />
                            </div>
                            <div className="col-md-12">
                                <p>Profile IP</p>
                                <input 
                                    type="text" 
                                    value={profileIP}
                                    name="profileIP" 
                                    onChange={onChange}
                                    required   
                                    readOnly={readOnly}                              
                                    className="form-control" 
                                    placeholder="IP" 
                                />
                            </div>

                            <div className="col-md-12">
                                <p>Port</p>
                                <input 
                                    name="profilePort" 
                                    type="text"
                                    className="form-control" 
                                    value={profilePort} 
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    placeholder="Port" 
                                    required                                    
                                />
                            </div>
                            <div className="col-md-12">
                                <p>ZPK</p>
                                <input  
                                    type="text"
                                    name="profileZPK" 
                                    className="form-control" 
                                    value={profileZPK} 
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    placeholder="ZPK"
                                    required                                     
                                />
                            </div>                            
                            {
                                readOnly ?
                                null :
                                <div className="col-md-6">
                                    <button 
                                        type="input"
                                        className="btn btn-primary" 
                                        disabled={isLoading}
                                    >
                                        {
                                            isLoading ? <IsFetching /> : 'Update'
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
export default withTimeout(ViewProfile);