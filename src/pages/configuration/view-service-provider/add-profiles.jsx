import React, { useState, useRef } from 'react';
// import IsFetching from '../../../components/isFetching/IsFetching.component';
import { useHistory } from 'react-router-dom';
import { addProfiles } from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import axios from 'axios';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';

export default function AddProfiles({ id, providerName }) {
    const [state, setState] = useState({
        profileIP: '',
        profileName: '',
        profileZPK: '',
        profilePort: ''
    })
    const onChange = (e) => {
        setState({
            ...state, 
            [e.target.name]: e.target.value
        })
    }
    const history = useHistory();
    let dismissModal = useRef();
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));
    const addProfile = (e) => {
        e.preventDefault();
        setState({
            ...state, 
            IsFetchingData: true
        })
        const { profileIP, profileName, profilePort, profileZPK } = state;
        let reqBody = {
            id,
            port: profilePort,
            profileIP,
            profileName,
            serviceProviders: {
              id,
              providerName
            },
            zpk: profileZPK
        }
        axios({
            url: `${addProfiles}`,
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
                IsFetchingData: false
            })
            if(result.data.respCode === '00'){
                Swal.fire({
                    type: 'success',
                    title: 'Successful Registration...',
                    text: 'Profile Registration was Successful!'
                })
                dismissModal.current.click();
                history.push('/configuration');
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
    const { profilePort, profileName, profileIP, profileZPK } = state;
    return (
        <div className="modal fade" id="addProfileModal" tabIndex="-1" role="dialog" aria-labelledby="addProfileModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Add a Profile</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={addProfile}>
                        <div className="form-row">
                            <div className="col-md-12">
                                <p>Profile Name</p>
                                <input 
                                    type="text" 
                                    value={profileName}
                                    name="profileName"
                                    onChange={onChange}
                                    required 
                                    className="form-control" 
                                    placeholder="Profile Name" 
                                />
                            </div>
                            <div className="col-md-12">
                                <p>Profile IP</p>
                                <input 
                                    type="text" 
                                    value={profileIP}
                                    name="profileIP" 
                                    onChange={onChange}
                                    required                                 
                                    className="form-control" 
                                    placeholder="IP" 
                                />
                            </div>

                            <div className="col-md-12">
                                <p>Port</p>
                                <input 
                                    name="profilePort" 
                                    type="text"
                                    className="form-control" 
                                    value={profilePort} 
                                    onChange={onChange}
                                    placeholder="Port" 
                                    required                                    
                                />
                            </div>
                            <div className="col-md-12">
                                <p>ZPK</p>
                                <input  
                                    type="text"
                                    name="profileZPK" 
                                    className="form-control" 
                                    value={profileZPK} 
                                    onChange={onChange}
                                    placeholder="ZPK"
                                    required                                     
                                />
                            </div> 
                            <div className="modal-footer">                            
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="button" className="btn btn-secondary" ref={dismissModal} data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}
