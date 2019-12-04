import React, { useContext, useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { useHistory } from 'react-router-dom';
import { allServiceProviders } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';

// Context for Authentication
import { authContext } from '../../../Context/Authentication.context';
import Layout from '../../../components/Layout/layout.component';
import ListOfServiceProvidersComponent from './list-of-service-providers.component';
import AddServiceProviderComponent from './add-service-provider.component';

const Configuration = () => {
    const history = useHistory();
    const { isAuthenticated } = useContext(authContext);
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
    if(!isAuthenticated){
        history.push('/')
    }
    const { isLoading, serviceProviders, addServiceProvider } = state;
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Configuration</h1>
            </div>
            <div className="d-flex justify-content-end">
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
        </Layout>
    )
}
export default withTimeout(Configuration);