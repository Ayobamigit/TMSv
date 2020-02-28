import React, {useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { allServiceProviders } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';

import Layout from '../../../components/Layout/layout.component';
import ListOfServiceProvidersComponent from './list-of-service-providers.component';
import AddServiceProviderComponent from './add-service-provider.component';

const Configuration = () => {
    const [state, setState] = useState({
        isLoading: false, 
        page: 0, 
        size: 5, 
        totalCount: 0, 
        serviceProviders: [],
        addServiceProvider: false
    })
    const setAddServiceProvider = () => {
        setState({
            ...state,
            addServiceProvider: !state.addServiceProvider
        })
    }
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));
    useEffect(() => {
        axios({
            url: `${allServiceProviders}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            timeout: FetchTimeOut
        })
        .then(result => {
            setState(state =>({
                ...state,
                isLoading: false
            }))
            if(result.data.respCode === '00'){
                setState(state => ({
                    ...state,
                    serviceProviders: result.data.respBody
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
            setState(state =>({
                ...state,
                isLoading: false
            }))
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `${err}`,
                footer: 'Please contact support'
            })
        });
    }, [authToken])

    const { isLoading, serviceProviders, addServiceProvider } = state;
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Configuration</h1>
            </div>
            <div className="page-content">
                <div className="d-flex justify-content-end mb-4">
                    <button className="btn btn-primary" onClick={setAddServiceProvider}>
                        {addServiceProvider ? 'Hide' : 'Add Service Provider'}
                    </button>
                </div>
                {
                    addServiceProvider ? 
                    <AddServiceProviderComponent />
                    : null
                }
                <ListOfServiceProvidersComponent 
                    isLoading={isLoading}
                    serviceProviders={serviceProviders}
                />
            </div>
        </Layout>
    )
}
export default withTimeout(Configuration);