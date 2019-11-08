import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import PreLoader from '../../../components/PreLoader/Preloader.component';
import { viewAnInstitution } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';

import { FetchTimeOut } from "../../../Utils/FetchTimeout";

// Context for Authentication
import { authContext } from '../../../Context/Authentication.context';
import Layout from '../../../components/Layout/layout.component';
import Axios from 'axios';

const {authToken} = JSON.parse(sessionStorage.getItem('userDetails'))

const InstitutionView = () => {
    const history = useHistory();
    const match = useRouteMatch();
    const [state, setState ] =  useState({ 
        id: '',
        institutionName: '', 
        institutionEmail: '', 
        institutionID: '', 
        merchantAccount: '', 
        institutionLocation: '', 
        institutionAddress: '',
        institutionPhone: '',
        createdBy: '', 
        dateCreated: ''
    });
    const [readOnly, setIsReadOnly ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const getDeviceData = () => {
            Axios({
                url: `${viewAnInstitution}/${match.params.id}`,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                data: {},
                timeout: FetchTimeOut
            })
                .then(result => {
                setIsLoading(false)
                if (result.data.respCode === '00'){
                    const { 
                    institutionName, institutionEmail, institutionID, merchantAccount, id,
                     institutionLocation, institutionAddress, institutionPhone, createdBy, dateCreated
                    } = result.data.respBody;
                    setState(state => ({
                        ...state, 
                        id,
                        institutionName,
                        institutionEmail,
                        institutionID,
                        merchantAccount, 
                        institutionLocation,
                        institutionAddress,
                        institutionPhone,
                        createdBy,
                        dateCreated
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
    }, [match.params.id])

    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const editFields = () => {
        setIsReadOnly(!readOnly)
    }

    const editInstitutionData = (e) => {
        e.preventDefault();
        const { 
            id, institutionName, institutionEmail, institutionID, merchantAccount, institutionLocation, institutionAddress, institutionPhone, createdBy, dateCreated
         } = state;
        const reqBody = {
            id,
            institutionName, 
            institutionEmail, 
            institutionID, 
            merchantAccount,
            institutionLocation, 
            institutionAddress, 
            institutionPhone,
            createdBy, 
            dateCreated
        };
        if (institutionName.trim() === '' || institutionEmail.trim() === '' || institutionID.trim() === '' || merchantAccount.trim() === '' || institutionLocation.trim() === '' || institutionAddress.trim() === '' || institutionPhone.trim() === '' || createdBy.trim() === '' || dateCreated.trim() === ''){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'Please fill all fields!'
            })
        } else {
            Axios({
                url: `${viewAnInstitution}/${match.params.id}`,
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                data: JSON.stringify(reqBody),
                timeout: FetchTimeOut
            })
            .then(result => {
                if(result.data.respCode === '00'){
                    Swal.fire({
                        type: 'success',
                        title: 'Successful Update...',
                        text: 'Institution Update was Successful!'
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

    const { isAuthenticated } = useContext(authContext)
    if(!isAuthenticated){
        history.push('/')
    }

    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Institution View</h1>
                    <button className="btn btn-sm btn-primary" onClick={editFields}>Edit Fields</button>
                </div>
                <div className="row">
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
                                    readOnly={readOnly} 
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
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Merchant Account</p>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Merchant Account" 
                                    value={state.merchantAccount} 
                                    name="merchantAccount"
                                    onChange={onChange}
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Institution Location</p>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Institution Location" 
                                    value={state.institutionLocation} 
                                    name="institutionLocation"
                                    onChange={onChange}
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Institution Address</p>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Institution Address" 
                                    value={state.institutionAddress} 
                                    name="institutionAddress"
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
export default withTimeout(InstitutionView);