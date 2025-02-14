import React, { useState, useEffect } from 'react';
// import { useHttp } from '../../../CustomHooks/useHttp.hooks';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import PreLoader from '../../../components/PreLoader/Preloader.component';
import Swal from '../../../constants/swal';
import { useRouteMatch } from 'react-router-dom';
import { viewAUser, getAInstitutionUser } from '../../../Utils/URLs';
import { FetchTimeOut } from '../../../Utils/FetchTimeout'

// Context for Authentication
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import IsFetching from '../../../components/isFetching/IsFetching.component';

const UserView = () => {
    const match = useRouteMatch();
    const [state, setState ] =  useState({
        firstname: '',
        lastname: '',
        email: '',
        institutionName: '',
        username: '',
        IsFetchingData: false
    });
    const [readOnly ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);
    const {authToken, institution} = JSON.parse(sessionStorage.getItem('userDetails'))

    useEffect(() => {
        const getUserData = () => {

            const reqBody = match.params.id

            if(institution){
                // console.log(institution)
                axios({
                    method: 'post',
                    url: `${getAInstitutionUser}`,
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
                        const { firstname, lastname, email,  username } = result.data.respBody;
                        setState(state => ({
                            ...state, 
                            firstname,
                            lastname,
                            email,
                            institutionName: institution.institutionName,
                            username
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
                    url: `${viewAUser}`,
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
                        const { firstname, lastname, email, institution:{institutionName}, username } = result.data.respBody;
                        setState(state => ({
                            ...state, 
                            firstname,
                            lastname,
                            email,
                            institutionName,
                            username
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
        } 
           
        
        getUserData();
    }, [match.params.id, authToken, institution])
        const onChange = (e) => {
            setState({...state, [e.target.name]: e.target.value})
        }

    const { IsFetchingData } = state;
    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                    <h1 className="h2">User</h1>
                </div>
                <div className="row page-content">
                    <div className="col-md-6">
                        <form>
                            <div className="form-group">
                                <p>First Name</p>
                                <input 
                                    name="firstname" 
                                    className="form-control" 
                                    value={state.firstname} 
                                    onChange={onChange}
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className="form-group">
                                <p>Last Name</p>
                                <input 
                                    name="lastname" 
                                    className="form-control" 
                                    value={state.lastname} 
                                    onChange={onChange} 
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className="form-group">
                                <p>Email</p>
                                <input  
                                    type="email"
                                    name="email" 
                                    className="form-control" 
                                    value={state.email} 
                                    onChange={onChange}
                                    required 
                                    readOnly={readOnly}
                                />
                            </div>  
                            <div className="form-group">
                                <p>Username</p>
                                <input
                                    name="username" 
                                    className="form-control" 
                                    value={state.username} 
                                    onChange={onChange}
                                    required 
                                    readOnly={readOnly}
                                />
                            </div> 
                            <div className="form-group">
                                <p>Institution Name</p>
                                <input
                                    name="institutionName" 
                                    className="form-control" 
                                    value={state.institutionName} 
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
export default withTimeout(UserView);