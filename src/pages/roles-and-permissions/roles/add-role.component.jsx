import React, { useState, useRef, useEffect, Fragment } from 'react'
import { addRoles, getAllPermissions } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import IsLoadingData from '../../../components/isLoadingData/isLoadingData';

    let permissionsToBeAdded = []
    let itemToBeDeleted = 0
    let allPermissionsArray = []
    const onChangeCheckBox = (e) => {
        const value = e.target.value
        const check = allPermissionsArray.find((permission) => {
            return permission.name === value
        })
        if(check){
            if(permissionsToBeAdded.length){
                const exists = permissionsToBeAdded.find((permission, i) => {
                    if(permission.name === value){
                        itemToBeDeleted = i;
                        return permission;
                    }
                })
                if(exists){
                    permissionsToBeAdded.splice(itemToBeDeleted, 1)
                } else {
                    permissionsToBeAdded.push(check)
                }
            } else {
                permissionsToBeAdded.push(check)
            }
        }
    }

export default function AddRole() {
    const [state, setState] = useState({
        description: "",
        name: "",
        permissions: [],
        isFetchingData: false,
        isLoading: false,
        allPermissions: []
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
            setState(state => ({
                ...state,
                isLoading: true
            }))
            axios.get(`${getAllPermissions}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                    'Bearer': authToken
                },
                timeout: FetchTimeOut
                })
              .then(result => {
                  if(result.data.respCode === '00'){
                      allPermissionsArray = result.data.respBody;
                      setState( state => ({
                        ...state,
                        allPermissions: result.data.respBody,
                        isLoading: false
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
              .catch(error => {
                setState(state =>({
                    ...state,
                    isLoading: false
                }))            
            });

    }, [authToken])
    const addRole = (e) => {
        e.preventDefault();
        setState({
            ...state, 
            isFetchingData: true
        })
        const { description, name } = state;
        let reqBody = {
            name,
            description,
            permissions: permissionsToBeAdded,
        }
        axios({
            url: `${addRoles}`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                'Bearer': authToken
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
    const { description, name, isFetchingData, allPermissions, isLoading } = state;
    return (
        <div className="modal fade" id="addRoleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add a Role</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={addRole}>
                        <div className="form-row">
                            <div className="col-md-12">
                                <p>Name</p>
                                <input 
                                    type="text" 
                                    value={name}
                                    name="name"
                                    onChange={onChange}
                                    required 
                                    className="form-control" 
                                    placeholder="Role Name" 
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
                        <div className="form-group">
                            <p>Permissions: </p>
                            {
                                isLoading ? 
                                <IsLoadingData />
                                : 
                                <Fragment>
                                    {
                                        allPermissions.length ?
                                        allPermissions.map((permission, i) => {
                                            // console.log(permission, i)
                                            return (
                                                <div className="form-check" key={i}>
                                                    <input className="form-check-input" onChange={onChangeCheckBox} type="checkbox" value={permission.name} />
                                                    <label className="form-check-label">
                                                        {permission.name}
                                                    </label>
                                                </div>
                                            )
                                        })
                                        :
                                        null
                                    }
                                </Fragment>
                            }
                            
                        </div>
                        <div className="modal-footer">                            
                            <button type="submit" disabled={isFetchingData || isLoading || !allPermissions.length} className="btn btn-primary">
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
