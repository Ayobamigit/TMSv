import React, {useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { allServiceProviders, globalSettings, getGlobalSettings } from '../../../Utils/URLs';
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
        addServiceProvider: false,
        switchButton: false,
        disableSwitchButton: false
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
            url: `${getGlobalSettings}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            timeout: FetchTimeOut
        })
        .then(result => {
            if(result.data.respCode === '00'){
                setState(state => ({
                    ...state,
                    switchButton: result.data.respBody
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

    const onSwitchChange = async() => {
        let value;
        if (state.switchButton){
            value =  false;
        } else {
            value = true;
        }
        globalSettingsActivation(value)
    }

    const globalSettingsActivation = async (value) => {
        setState({
            ...state,
            disableSwitchButton: true
        })
        axios({
            url: `${globalSettings}?request=${value}`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            timeout: FetchTimeOut
        })
        .then(result => {
            setState(state =>({
                ...state,
                isLoading: false,
                disableSwitchButton: false
            }))
            if(result.data.respCode === '00'){
                setState({
                    ...state,                    
                    switchButton: !state.switchButton
                })                
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
            disableSwitchButton: false,
            isLoading: false
            }))
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `${err}`,
                footer: 'Please contact support'
            })
        });
    }

    const { isLoading, serviceProviders, addServiceProvider, switchButton, disableSwitchButton } = state;
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Configuration</h1>
            </div>
            <div className="page-content">
                <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex justify-content-between align-item-end">
                        <p className="pr-5">{`${switchButton ? 'Disable' : 'Enable'} Global Settings:`}</p>
                        <div className="switch">
                            <span  onClick={onSwitchChange}>
                                <input type="checkbox" checked={switchButton} disabled={disableSwitchButton} readOnly />
                                <span className={`slider round ${disableSwitchButton ? 'disabled' : ''}`}></span>
                            </span>
                        </div>
                    </div>
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