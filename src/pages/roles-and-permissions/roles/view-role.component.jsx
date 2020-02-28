import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Layout from '../../../components/Layout/layout.component';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import { editRoles, getAllPermissions } from '../../../Utils/URLs'
import IsLoadingData from '../../../components/isLoadingData/isLoadingData';
import DeletePermission from './delete-permissions';
import { hasPermission, CREATE_ROLES } from '../../../Utils/getPermission'

// Controls Adding of Permissions
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

export default function ViewRole() {
    const [state, setState] = useState({
        permissions: [],
        id: '',
        readOnly: true,
        name: '', 
        description: '',
        isFetchingData: false,
        isLoading: false,
        allPermissions: [],
    })
    const history = useHistory();
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));
    useEffect(() => {
        if (history.location.state === undefined){
            history.goBack();
		} else{
            setState(state => ({
                ...state,
                isLoading: true
            }))
            axios.get(`${getAllPermissions}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                timeout: FetchTimeOut
                })
              .then(result => {
                const { permissions, name, description, id } = history.location.state;  
                allPermissionsArray = result.data.respBody;
                  if(result.data.respCode === '00'){
                      setState( state => ({
                        ...state,
                        allPermissions: result.data.respBody,
                        permissions,
                        name,
                        description,
                        id,
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
        }

    }, [history, authToken])
    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const editFields = () => {
        setState({
            ...state,
            readOnly: !state.readOnly
        })
    }

    const updateRole = (e) => {
        e.preventDefault();
        setState({
            ...state, 
            isFetchingData: true
        })
        const { name, description, id, permissions } = state;
        let newPermissions = [...permissionsToBeAdded, ...permissions]
        newPermissions = newPermissions.filter((permission, index, self) =>
            index === self.findIndex((t) => (
                t.name === permission.name
            ))
        )
        let reqBody = {
            name,
            description,
            permissions: newPermissions,
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
                    text: 'Role Update was Successful!'
                })
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
    

    const { name, description, readOnly, isFetchingData, isLoading, allPermissions, permissions } = state; 

    // This chunk of code filters out available permissions from the list of permisssions
    let props = ['id', 'name'];
    let availablePermissions = allPermissions.filter((o1) => {
        // filter out (!) items in result2
        return !permissions.some(function(o2){
            return o1.id === o2.id;          // assumes unique id
        });
    }).map((o) => {
        // use reduce to make objects with only the required properties and map to apply this to the filtered array as a whole
        return props.reduce(function(newo, name){
            newo[name] = o[name];
            return newo;
        }, {});
    });  
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Role</h1>
                {
                    hasPermission(CREATE_ROLES) ? 
                    <button className="btn btn-sm btn-primary" onClick={editFields}>Edit Fields</button>
                    :
                    null
                }
            </div>
            <div className="row page-content">
                {
                    isLoading ? 
                    <IsLoadingData />
                    :
                    <div className="col-md-12">
                        <form onSubmit={updateRole}>
                            <div className="form-group col-6">
                                <p>Name</p>
                                <input 
                                    type="text"
                                    name="name" 
                                    className="form-control" 
                                    defaultValue={name} 
                                    onChange={onChange}
                                    required
                                    readOnly={readOnly}
                                />
                            </div> 
                            <div className="form-group col-6">
                                <p>Description</p>
                                <textarea
                                    rows="3"
                                    value={description}
                                    name="description"
                                    onChange={onChange}
                                    required 
                                    readOnly={readOnly}
                                    className="form-control" 
                                    placeholder="Description"
                                >
                                </textarea>
                            </div>
                            <div className="form-group col-6">
                                <p className="d-flex justify-content-between">
                                    Attached Permissions: 
                                    {
                                        hasPermission(CREATE_ROLES) ?
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#deletePermissionModal">
                                            {` `} Delete Permission(s)
                                        </button>
                                        :
                                        null
                                    }
                                </p>
                                {
                                    permissions.length ?
                                    permissions.map((permission, i) => {
                                        return (
                                            <div className="form-check" key={i}>
                                                <input className="form-check-input" disabled type="checkbox" value={permission.name} />
                                                <label className="form-check-label">
                                                    {permission.name}
                                                </label>
                                            </div>
                                        )
                                    })
                                    :
                                    null
                                }
                            </div>
                            <div className="form-group col-6">
                                <p>Add More Permissions: 
                                {
                                    availablePermissions.length ?
                                    availablePermissions.map((permission, i) => {
                                        return (
                                            <div className="form-check" key={i}>
                                                <input className="form-check-input" disabled={readOnly} onChange={onChangeCheckBox} type="checkbox" value={permission.name} />
                                                <label className="form-check-label">
                                                    {permission.name}
                                                </label>
                                            </div>
                                        )
                                    })
                                    :
                                    <span> No available permission.</span>
                                }
                                </p>
                                
                            </div>
                            {
                                readOnly ?
                                null :
                                <div className="form-group d-flex justify-content-end">
                                    <button 
                                        type="input"
                                        className="btn btn-primary" 
                                        disabled={isFetchingData}
                                    >
                                        {
                                            isFetchingData ? <IsFetching /> : 'Update'
                                        }
                                    </button>
                                </div>
                            }               
                        </form>
                    </div>
                }
            </div>
            {
                hasPermission(CREATE_ROLES) ?
                    <DeletePermission 
                        permissions={permissions} 
                        allPermissionsArray={allPermissionsArray} 
                        name={name}
                        description={description}
                        id={state.id}
                    />
                :
                null
            }
        </Layout>
    )
}
