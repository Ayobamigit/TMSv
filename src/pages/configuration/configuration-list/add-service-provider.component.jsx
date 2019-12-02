import React, { useState } from 'react';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import { useHistory } from 'react-router-dom';
import { addServiceProviders } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';

export default function AddServiceProviderComponent() {
    const [state, setState] = useState({
        IsFetchingData: false,
        nameOfServiceProvider: ''
    })
    const history = useHistory();
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));
    const createServiceProvider = (e) => {
        e.preventDefault();        
        setState({
            ...state, 
            IsFetchingData: true
        })
        let reqBody = {
            providerName: state.nameOfServiceProvider
        }
        axios({
            url: `${addServiceProviders}`,
            method: 'post',
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
                    title: 'Successful Registration...',
                    text: 'Service Provider Registration was Successful!'
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
    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    } 
    const { IsFetchingData, nameOfServiceProvider } = state;
    return (
        <div className="mb-5">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Service Provider Registration</h1>
            </div>
            <div className="col-md-12">
            <form onSubmit={createServiceProvider}>
                <div className="form-row">
                    <div className="col-md-6">
                        <p>Name of Service Provider</p>
                        <input 
                            type="text" 
                            value={nameOfServiceProvider}
                            name="nameOfServiceProvider" 
                            onChange={onChange}
                            required 
                            className="form-control" 
                            placeholder="Name of Service Provider" 
                        />
                    </div>
                </div> 
                <div className="form-group">
                    <button 
                        type="input"
                        className="btn btn-primary" 
                        disabled={IsFetchingData}
                    >
                        {
                            IsFetchingData ? <IsFetching /> : 'Create'
                        }
                    </button>
                </div>                
            </form>    
            </div>
        </div>
    )
}
