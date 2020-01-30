import React, { useState, useRef, useEffect } from 'react'
import { addRoles, getAllPermissions } from '../../Utils/URLs';
import Swal from '../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../Utils/FetchTimeout';
import IsFetching from '../../components/isFetching/IsFetching.component';

export default function AddPermissions() {
    const [state, setState] = useState({
        permissions: [],
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
    useEffect(() => {
        axios({
            url: `${getAllPermissions}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            timeout: FetchTimeOut
        })
        .then(result => {
            setState(state => ({
                ...state, 
                isFetchingData: false
            }))
            if(result.data.respCode === '00'){
                setState(state => ({
                    ...state,
                    permissions: result.data.respBody
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
                isFetchingData: false
            }))
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `${err}`,
                footer: 'Please contact support'
            })
        });
    }, [authToken])
    const addPermissions = (e) => {
        e.preventDefault();
        setState({
            ...state, 
            isFetchingData: true
        })
        const { permissions } = state;
        let reqBody = {
            permissions
        }
        axios({
            url: `${addRoles}`,
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
                    title: 'Successful Registration...',
                    text: 'Role Addition was Successful!'
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
    const { description, email, userType, isFetchingData } = state;
    return (
        <div className="modal fade" id="addPermissionsModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Permissions</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={addPermissions}>
                        <div className="form-row">
                            <div className="col-md-12">
                                <p>User Type </p>
                                <select className="custom-select" value={userType} required name="userType" onChange={onChange}>
                                    <option value="">Choose a User Type</option>
                                    <option value="SuperAdmin">Super Admin</option>
                                    <option value="InstitutionAdmin">Institution Admin</option>
                                    <option value="InstitutionUser">Institution User</option>
                                    <option value="TerminalUser">Terminal User</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <p>Name</p>
                                <input 
                                    type="text" 
                                    value={userType}
                                    name="name"
                                    readOnly
                                    onChange={onChange}
                                    required 
                                    className="form-control" 
                                    placeholder="Role Name" 
                                />
                            </div>
                            <div className="col-md-12">
                                <p>Email</p>
                                <input 
                                    type="text" 
                                    value={email}
                                    name="email"
                                    onChange={onChange}
                                    required 
                                    className="form-control" 
                                    placeholder="Email" 
                                />
                            </div>
                            <div className="col-md-12">
                                <p>Description</p>
                                <textarea
                                    rows="3"
                                    value={description}
                                    name="description"
                                    onChange={onChange}
                                    required 
                                    className="form-control" 
                                    placeholder="Description"
                                >
                                </textarea>
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
