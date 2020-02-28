import React, { useState, useEffect, Fragment, useRef } from 'react'
import { getAllPermissions } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ViewPermissions() {
    const [state, setState] = useState({
        permissions: [],
        isFetchingData: false,
        permissionToBeDeleted: []
    })
    let dismissModal = useRef();
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
    const { permissions, isFetchingData } = state;
    return (
        <div className="modal fade" id="viewPermissionsModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">All Permissions</h5>
                    <button type="button" className="close" ref={dismissModal} data-dismiss="modal" aria-label="Close">
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
                                        const { name, description } = permission;
                                        return (
                                            <div className="card" key={i}>
                                                <div className="card-header d-flex justify-content-between align-items-center" id={`heading${i + 10}`}>
                                                    <h2 className="mb-0">
                                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${i + 10}`} aria-expanded="true" aria-controls={`collapse${i + 10}`}>
                                                            {name}
                                                        </button>
                                                    </h2>
                                                    <div className="d-flex justify-content-between">
                                                        <Link 
                                                            onClick={() => {
                                                                dismissModal.current.click();
                                                            }}
                                                            to={{pathname: `/roles/permission/${name.toLowerCase()}`, 
                                                            state: permission} }
                                                        >
                                                            <FontAwesomeIcon icon="eye" size="2x" className="ml-5" title="View this Permission" /></Link>
                                                    </div>
                                                </div>
                                                <div id={`collapse${i + 10}`} className={`collapse ${i === 0 ? 'show': ''}`} aria-labelledby={`heading${i + 10}`} data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <p>Name: {name} </p>
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
        </div>
    )
}
