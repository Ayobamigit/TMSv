import React, { useState, useRef } from 'react'
import { deletePermissions } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import IsFetching from '../../../components/isFetching/IsFetching.component';

export default function DeletePermission( { permissionToBeDeleted }) {
    const [state, setState] = useState({
        password: "",
        isFetchingData: false
    })
    let dismissModal = useRef();
    const onChange = (e) => {
        setState({
            ...state, 
            [e.target.name]: e.target.value
        })
    }
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));
    const deletePermission = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#037b86',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {              
                setState({
                    ...state, 
                    isFetchingData: true
                })
                // const { password } = state;
                let reqBody = permissionToBeDeleted;
                axios({
                    url: `${deletePermissions}`,
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
                        isFetchingData: false
                    })
                    if(result.data.respCode === '00'){
                        Swal.fire({
                            type: 'success',
                            title: 'Successful Deletion...',
                            text: 'Permission Deletion was Successful!'
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
                        isFetchingData: false
                    })
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${err}`,
                        footer: 'Please contact support'
                    })
                });
            }
        })
    }
    const { password, isFetchingData } = state;
    return (
        <div className="modal fade" id="deletePermissionModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Delete this Permission</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={deletePermission}>
                        <div className="form-row">
                            <div className="col-md-12">
                                <p>Enter Password below to delete this role</p>
                                <input 
                                    type="password" 
                                    value={password}
                                    name="password"
                                    onChange={onChange}
                                    required 
                                    className="form-control" 
                                    placeholder="Enter Password" 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">                            
                            <button type="submit" disabled={isFetchingData} className="btn btn-primary">
                                {
                                    isFetchingData ? <IsFetching /> : 'Submit'
                                }
                            </button>
                            <button type="button" className="btn btn-secondary" ref={dismissModal} data-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}
