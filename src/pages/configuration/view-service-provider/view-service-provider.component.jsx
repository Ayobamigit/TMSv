import React, { useState, useEffect } from 'react';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import { useRouteMatch } from 'react-router-dom';
import { getServiceProviderById } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import Layout from '../../../components/Layout/layout.component';
import NoResultFound from '../../../components/NoResultFound/NoResultfound';
import AddProfiles from './add-profiles';

export default function ViewServiceProvider() {
    const [state, setState] = useState({
        IsFetchingData: false,
        nameOfServiceProvider: '',
        serviceProviders: [],
        profiles: []
    })
    const match = useRouteMatch();
    const {authToken} = JSON.parse(sessionStorage.getItem('userDetails'))
    useEffect(() => {
        setState({
            ...state,
            IsFetchingData: true
        })
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
                setState({
                    ...state,
                    IsFetchingData: false
                })
                if(result.data.respCode === '00'){
                    const { providerName, profile } = result.data.respBody;
                    console.log( result.data.respBody)
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
        }, [match.params.id]);

    const editServiceProvider = (e) => {
        e.preventDefault();
    }

    const { IsFetchingData, nameOfServiceProvider, profiles } = state;
    return (
        <Layout>
            <div className="mb-5">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Service Provider Registration</h1>
                    <button  type="button" className="btn btn-primary" data-toggle="modal" data-target="#addProfileModal">Add Service Provider <i className="fa fa-plus-square"></i></button>
                </div>
                <div className="col-md-12">
                    <form onSubmit={editServiceProvider}>
                        <div className="form-row">
                            <div className="col-md-6">
                                <p>Name of Service Provider</p>
                                <input 
                                    type="text" 
                                    value={nameOfServiceProvider}
                                    name="nameOfServiceProvider"
                                    readOnly
                                    className="form-control" 
                                    placeholder="Name of Service Provider" 
                                />
                            </div>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    { 
                                        profiles.length === 0 ? 
                                        <NoResultFound />
                                        :
                                        profiles.map((profile, i) => {
                                            const { profileName, profileIP, port, zpk } = profile;                                        
                                            return (
                                                <tr key={i}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{profileName}</td>
                                                    <td>{profileIP}</td>
                                                    <td>{port}</td>
                                                    <td>{zpk}</td>                                                
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
        </Layout>
    )
}
