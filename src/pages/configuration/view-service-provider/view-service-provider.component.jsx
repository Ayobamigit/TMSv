import React, { useState, useEffect } from 'react';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import { useRouteMatch, Link } from 'react-router-dom';
import { getServiceProviderById, editProviders } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import Layout from '../../../components/Layout/layout.component';
import NoResultFound from '../../../components/NoResultFound/NoResultfound';
import AddProfiles from './add-profiles';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import DeleteProfile from './deleteProfile.component';

const ViewServiceProvider = () => {
    const [state, setState] = useState({
        IsFetchingData: false,
        nameOfServiceProvider: '',
        serviceProviders: [],
        profiles: [],
        updateServiceProvider: false,
        readOnly: true,
        idToBeDeleted: ''
    })
    const match = useRouteMatch();
    const {authToken} = JSON.parse(sessionStorage.getItem('userDetails'));
    const updateServiceProviderButton = () => {
        setState(state => ({
            ...state,
            updateServiceProvider: !state.updateServiceProvider,
            readOnly: !state.readOnly
        }))
    }
    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        setState(state => ({
            ...state,
            IsFetchingData: true
        }))
            axios({
                method: 'get',
                url: `${`${getServiceProviderById}`}/${match.params.id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                data: {},
                timeout: FetchTimeOut
            })
            .then(result => {
                setState(state => ({
                    ...state,
                    IsFetchingData: false
                }))
                if(result.data.respCode === '00'){
                    const { providerName, profile } = result.data.respBody;
                    setState(state => ({
                        ...state, 
                        nameOfServiceProvider: providerName,
                        profiles: profile
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
                setState(state => ({
                    ...state,
                    IsFetchingData: false
                }))
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                    footer: 'Please contact support'
                })
            });
        }, [match.params.id, authToken]);

        const upDateServiceProvider = (e) => {
            e.preventDefault();        
            setState({
                ...state, 
                IsFetchingData: true
            })
            let reqBody = {
                providerName: state.nameOfServiceProvider,
                id: match.params.id
            }
            axios({
                url: `${editProviders}/${match.params.id}`,
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
                    IsFetchingData: false
                })
                if(result.data.respCode === '00'){
                    Swal.fire({
                        type: 'success',
                        title: 'Successful Update...',
                        text: 'Service Provider Update was Successful!'
                    })
                    updateServiceProviderButton();  
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

    const { IsFetchingData, nameOfServiceProvider, profiles, updateServiceProvider, readOnly } = state;
    return (
        <Layout>
            <div className="mb-5">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Service Provider Registration</h1>
                    <button type="button" onClick={updateServiceProviderButton} className="btn btn-primary">Update Service Provider</button>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addProfileModal">Add Profile <i className="fa fa-plus-square"></i></button>
                </div>
                <div className="col-md-12">
                    <form onSubmit={upDateServiceProvider}>
                        <div className="form-row">
                            <div className="col-md-6">
                                <p>Name of Service Provider</p>
                                <input 
                                    type="text" 
                                    value={nameOfServiceProvider}
                                    name="nameOfServiceProvider"
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    className="form-control" 
                                    placeholder="Name of Service Provider" 
                                />
                            </div>
                            {
                                updateServiceProvider ? 
                                <div className="col-md-12">
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
                                : null
                            }
                            
                    </div>               
                    </form>    
                </div>
                <div className="row">
                <div className="table-layout col-md-12">
                    <h5 className="text-center">List of Profiles</h5>
                        <div>
                            <table className="table table-striped" id="table-to-xls">
                                <thead>
                                    <tr>
                                        <th scope="col">S/N</th>
                                        <th scope="col">Profile Name</th>
                                        <th scope="col">IP</th>
                                        <th scope="col">Port</th>
                                        <th scope="col">ZPK</th>
                                        <th scope="col">Delete</th>
                                        <th scope="col">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { 
                                        profiles.length === 0 ? 
                                        <NoResultFound />
                                        :
                                        profiles.map((profile, i) => {
                                            const { profileName, profileIP, port, zpk, id } = profile;  
                                            return (
                                                <tr key={i}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{profileName}</td>
                                                    <td>{profileIP}</td>
                                                    <td>{port}</td>
                                                    <td>{zpk}</td>  
                                                    <td data-toggle="modal" data-target="#deleteModal" onClick={() => setState({...state, idToBeDeleted: id})}>
                                                        <Link to="#"><i className="fa fa-2x fa-trash"></i></Link>
                                                    </td> 
                                                    <td>
                                                        <Link to={`/configuration/profile/${id}`}><i className="fa fa-2x fa-eye"></i></Link>
                                                    </td>                                                                                                 
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddProfiles 
                id={match.params.id}
                providerName={nameOfServiceProvider}
            />
            <DeleteProfile 
                id={state.idToBeDeleted}
            />
        </Layout>
    )
}
export default withTimeout(ViewServiceProvider);