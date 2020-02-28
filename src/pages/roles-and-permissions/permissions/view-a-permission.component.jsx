import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Layout from '../../../components/Layout/layout.component';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import { updatePermissions } from '../../../Utils/URLs'

export default function ViewAPermission() {
    const [state, setState] = useState({
        id: '',
        readOnly: true,
        name: '', 
        description: '',
        isFetchingData: false
    })
    const history = useHistory();
    useEffect(() => {
        if (history.location.state === undefined){
            history.goBack();
		} else{
            const { id, name, description } = history.location.state;
            setState( state => ({
                ...state,
                id,
                name,
                description
            }))
        }
    }, [history])
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

    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));
    const updatePermission = (e) => {
        e.preventDefault();
        setState({
            ...state, 
            isFetchingData: true
        })
        const { name, description, id } = state;
        let reqBody = {
            name,
            description,
            id
        }
        axios({
            url: `${updatePermissions}`,
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
            // console.log(result)
            if(result.data.respCode === '00'){
                Swal.fire({
                    type: 'success',
                    title: 'Successful Update...',
                    text: 'Permission Update was Successful!'
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
    const { name, description, readOnly, isFetchingData } = state; 
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Permission</h1>
                <button className="btn btn-sm btn-primary" onClick={editFields}>Edit Fields</button>
            </div>
            <div className="row page-content">
                <div className="col-md-6">
                    <form onSubmit={updatePermission}>
                        <div className="form-group">
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
                        <div className="form-group">
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
                        {
                            readOnly ?
                            null :
                            <div className="form-group">
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
            </div>
        </Layout>
    )
}
