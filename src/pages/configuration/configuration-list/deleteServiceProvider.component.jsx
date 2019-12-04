import React, { useState, useRef } from 'react';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import { deleteServiceProviderById } from '../../../Utils/URLs';


export default function DeleteServiceProvider({ id }) {
    const [state, setState] = useState({
        password: '',
        IsFetchingData: false
    })
    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const { authToken, userName } = JSON.parse(sessionStorage.getItem('userDetails'));
    let dismissModal = useRef();

    const deleteServiceProvider = (e) => {
        e.preventDefault();
        setState({
            ...state, 
            IsFetchingData: true
        })
        let reqBody = {
            password: state.password,
            idToDelete: id,
            username: userName
        }
        axios({
            url: `${deleteServiceProviderById}/${id}`,
            method: 'delete',
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
                    title: 'Successful Delete...',
                    text: 'Service Provider has been deleted'
                })
                dismissModal.current.click();
                window.location.reload();  
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
    return (
        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Delete Service Provider</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={deleteServiceProvider}>
                        <div className="form-row">
                            <div className="col-md-12">
                                <p>Enter Password to continue</p>
                                <input 
                                    type="password" 
                                    value={state.password}
                                    name="password" 
                                    onChange={onChange}
                                    required 
                                    className="form-control" 
                                    placeholder="Enter Password" 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={dismissModal} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">
                                {
                                    state.IsFetchingData ? <IsFetching /> : 'Delete'
                                }
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}
