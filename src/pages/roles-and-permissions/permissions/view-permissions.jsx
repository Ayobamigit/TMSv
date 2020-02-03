import React, { useState, useEffect, Fragment } from 'react'
import { getAllPermissions } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import DeletePermission from './delete-permission.component';

export default function ViewPermissions() {
    const [state, setState] = useState({
        permissions: [],
        isFetchingData: false,
        permissionToBeDeleted: []
    })
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
    const { permissions, isFetchingData, permissionToBeDeleted } = state;
    return (
        <div className="modal fade" id="viewPermissionsModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">All Permissions</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {
                        isFetchingData ?
                        <IsFetching />
                        :
                        <Fragment>
                            <div className="accordion" id="accordionExample">
                                {
                                    permissions.map((permission, i) => {
                                        const { name, description, userType } = permission;
                                        return (
                                            <div className="card" key={i}>
                                                <div className="card-header d-flex justify-content-between align-items-center" id={`heading${i + 10}`}>
                                                    <h2 className="mb-0">
                                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${i + 10}`} aria-expanded="true" aria-controls={`collapse${i + 10}`}>
                                                            {name}
                                                        </button>
                                                    </h2>
                                                    <div className="d-flex justify-content-between">
                                                        <i className="fa fa-2x fa-eye ml-5" title="View this Role"></i>
                                                        <i className="fa fa-2x fa-trash ml-5" data-toggle="modal" onClick={() => {setState({ ...state, permissionToBeDeleted: permission })}} data-target="#deletePermissionModal" title="Delete this Permission"></i>
                                                    </div>
                                                </div>
                                                <div id={`collapse${i + 10}`} className={`collapse ${i === 0 ? 'show': ''}`} aria-labelledby={`heading${i + 10}`} data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <p>Name: {name} </p>
                                                        <p>User Type: {userType}</p>
                                                        <p>Description: { description }</p>                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Fragment>
                    }
                </div>
                </div>
            </div>
            <DeletePermission permissionToBeDeleted={permissionToBeDeleted} />
        </div>
    )
}
