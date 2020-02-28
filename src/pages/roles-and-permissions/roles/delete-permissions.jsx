import React, { useState, useRef } from 'react'
import { editRoles } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import { useHistory } from 'react-router-dom';


export default function DeletePermission( { permissions,allPermissionsArray, name, description, id }) {
    const [state, setState] = useState({
        isFetchingData: false
    })
    let dismissModal = useRef();
    const history =  useHistory()
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));
    // Controls Deleting of Permissions
    let itemToDelete = 0
    const onChangeCheckBoxForDelete = (e) => {
        const value = e.target.value
        const check = allPermissionsArray.find((permission) => {
            return permission.name === value
        })
        if(check){
            if(permissions.length){
                const exists = permissions.find((permission, i) => {
                    if(permission.name === value){
                        itemToDelete = i;
                        return permission;
                    }
                })
                if(exists){
                    permissions.splice(itemToDelete, 1)
                } else {
                    permissions.push(check)
                }
            } else {
                permissions.push(check)
            }
        }
    }
    const deletePermission = (e) => {
        e.preventDefault()
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
                let reqBody = {
                    name,
                    description,
                    permissions,
                    id
                }
                axios({
                    url: `${editRoles}`,
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
                            title: 'Successful Update...',
                            text: 'Ticked Role(s) have been deleted!'
                        })
                        dismissModal.current.click();
                        history.goBack()
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
            }
        })
    }

    const { isFetchingData } = state;
    return (
        <div className="modal fade" id="deletePermissionModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Tick Permissions to be deleted from {`${name}`}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={deletePermission}>
                        {
                            permissions.length ?
                            permissions.map((permission, i) => {
                                return (
                                    <div className="form-check" key={i}>
                                        <input className="form-check-input" onChange={onChangeCheckBoxForDelete} type="checkbox" value={permission.name} />
                                        <label className="form-check-label">
                                            {permission.name}
                                        </label>
                                    </div>
                                )
                            })
                            :
                            null
                        }
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