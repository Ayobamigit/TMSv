import React, {useState, useEffect } from 'react';
import withTimeout from '../../HOCs/withTimeout.hoc';
import { getRolesAndPermissions } from '../../Utils/URLs';
import Swal from '../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../Utils/FetchTimeout';
import './roles-and-permissions.styles.scss';

import Layout from '../../components/Layout/layout.component';
import AddRole from './roles/add-role.component';
import DeleteRole from './roles/delete-role.component';
import AddPermissions from './permissions/add-permissions';
import ViewPermissions from './permissions/view-permissions';
import { Link } from 'react-router-dom';

const RolesAndPermissions = () => {
    const [state, setState] = useState({
        isLoading: false, 
        rolesAndPermissions: [],
        roleToBeDeleted: []
    })
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));
    useEffect(() => {
        axios({
            url: `${getRolesAndPermissions}`,
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
                    rolesAndPermissions: result.data.respBody
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
    const { rolesAndPermissions } =  state;

    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Roles and Permissions</h1>
            </div>
            <div className="page-content accordion">
                <div className="d-flex justify-content-between mb-4">
                    <h6>All Roles and Permissions</h6>
                    <button className="btn btn-primary" data-toggle="modal" data-target="#addRoleModal">
                        Add Role
                    </button>
                    <button className="btn btn-primary" data-toggle="modal" data-target="#addPermissionsModal">
                        Add Permissions
                    </button>
                    <button className="btn btn-primary" data-toggle="modal" data-target="#viewPermissionsModal">
                        View All Permissions
                    </button>
                </div>
                <div>
                    {
                        rolesAndPermissions.length ?
                        <div className="accordion" id="rolesAccordion">
                            {
                                rolesAndPermissions.map((roleAndPermission, i) => {
                                    const { name, email, description, userType, permissions } = roleAndPermission;
                                    return (
                                        <div className="card" key={i}>
                                            <div className="card-header d-flex justify-content-between align-items-center">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${i}`} aria-expanded="true">
                                                        {name}
                                                    </button>
                                                </h2>
                                                <div className="d-flex justify-content-between">
                                                    <Link 
                                                        to={{pathname: `/roles/${name.toLowerCase()}`, 
                                                        state: roleAndPermission} }>
                                                        <i className="fa fa-2x fa-eye ml-5" title="View this Role"></i>
                                                    </Link>
                                                    <i className="fa fa-2x fa-trash ml-5" data-toggle="modal" onClick={() => {setState({ ...state, roleToBeDeleted: roleAndPermission })}} data-target="#deleteRoleModal" title="Delete this Role"></i>
                                                </div>
                                            </div>
                                            <div id={`collapse${i}`} className={`collapse ${i === 0 ? 'show': ''}`} data-parent="#rolesAccordion">
                                                <div className="card-body">
                                                    <p><b>Email: </b>{email}</p>
                                                    <p><b>Description: </b>{description}</p>
                                                    <p><b>User Type: </b>{userType}</p>
                                                    <p><b>Permissions: </b></p>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                            <th scope="col">S/N</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Description</th>
                                                            <th scope="col">User Type</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            permissions.map((permission, i) => {
                                                                const { name, description, userType } = permission;
                                                                return( 
                                                                    <tr key={i}>
                                                                        <th scope="row">{i + 1}</th>
                                                                        <td>{name}</td>
                                                                        <td>{description}</td>
                                                                        <td>{userType}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        'No Roles and Permissions Added yet.'
                    }
                </div>
            </div>

            {/* Add role Modal */}
            <AddRole />
            <DeleteRole roleToBeDeleted={state.roleToBeDeleted} />
            <AddPermissions />
            <ViewPermissions />
        </Layout>
    )
}
export default withTimeout(RolesAndPermissions);