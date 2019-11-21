import React, { useState, useRef } from 'react';
import { deleteAUser } from '../../../Utils/URLs';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import Swal from '../../../constants/swal';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import axios from 'axios';

export default function DeleteModal({ id }) {
    const [ state, setState ] = useState({
        password: '',
        IsFetchingData: false
    })
    const {authToken, userName} = JSON.parse(sessionStorage.getItem('userDetails'));
    let dismissModal = useRef()
    const deleteUser = (e) => {
        e.preventDefault();
        const { password } = state;
        const reqBody = {
            password,
            username: userName,
            userToDeleteid: id
        }
        if (password.trim() === ''){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'Please enter your password!'
            })
        } else {
            setState({
                ...state, 
                IsFetchingData: true
            })
            axios({
                method: 'delete',
                url: `${deleteAUser}/${id}`,
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
                        title: 'Successful Action...',
                        text: 'User was deleted Successfully!'
                    })
                    dismissModal.current.click();
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
    }
    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const { IsFetchingData } = state;
    return ( 
        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to delete this user?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={deleteUser}>
                        <div className="form-group">
                            <p>Enter Password to Continue</p>
                            <input 
                                name="password" 
                                type="password"
                                className="form-control" 
                                value={state.password} 
                                onChange={onChange}
                                required
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={dismissModal}>Close</button>
                    <button 
                        type="submit" 
                        onClick={deleteUser} 
                        className="btn btn-primary"
                        disabled={IsFetchingData}
                    >
                        {
                            IsFetchingData ? <IsFetching /> : 'Delete'
                        }
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}
