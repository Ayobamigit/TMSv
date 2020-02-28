import React, {useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { viewAnInstitution } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';

import Layout from '../../../components/Layout/layout.component';
import IsLoadingData from '../../../components/isLoadingData/isLoadingData';

const GlobalSetting = () => {
    const [state, setState] = useState({
        isLoading: false, 
        switchButton: false,
        disableSwitchButton: false,
        requestBody: {}
    })
    const { authToken, institutionID } = JSON.parse(sessionStorage.getItem('userDetails'));
    useEffect(() => {
        axios({
            url: `${viewAnInstitution}/${institutionID}`,
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
                    switchButton: result.data.respBody.globalSetting,
                    requestBody: result.data.respBody
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
    }, [authToken, institutionID])

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
        let reqBody = {
            ...state.requestBody,
            globalSetting: value
        }
        axios({
            url: `${viewAnInstitution}/${institutionID}`,
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            data: reqBody,
            timeout: FetchTimeOut
        })
        .then(result => {
            // console.log(result)
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

    const { isLoading, switchButton, disableSwitchButton } = state;
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Global Setting</h1>
            </div>
            <div className="page-content">
                <div className="d-flex justify-content-between mb-4">
                    {
                        isLoading ?
                        <IsLoadingData />
                        :
                        <div className="d-flex justify-content-between align-item-end">
                            <p className="pr-5">{`${switchButton ? 'Disable' : 'Enable'} Global Settings:`}</p>
                            <span className="mr-3">NIBSS</span>
                            <div className="switch">
                                <span  onClick={onSwitchChange}>
                                    <input type="checkbox" checked={switchButton} disabled={disableSwitchButton} readOnly />
                                    <span className={`slider round ${disableSwitchButton ? 'disabled' : ''}`}></span>
                                </span>
                            </div>
                            <span className="ml-3">INTERSWITCH</span>
                        </div>
                    }
                    
                </div>
            </div>
        </Layout>
    )
}
export default withTimeout(GlobalSetting);
