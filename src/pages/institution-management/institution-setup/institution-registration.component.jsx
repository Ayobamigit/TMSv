import React, { useState, useContext } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import Swal from '../../../constants/swal';
import baseUrl from '../../../constants/baseurl';
import { useHistory } from 'react-router-dom';

// Context for Authentication
import { authContext } from '../../../Context/Authentication.context';
import Layout from '../../../components/Layout/layout.component';

const InstitutionRegistration = () => {
    const [state, setState ] =  useState({ 
        institutionName: '', 
        institutionEmail: '', 
        institutionID: '', 
        institutionType: '',
        merchantAccount: '', 
        merchantWalletID: '', 
        merchantBank: '', 
        acquiringBank: '', 
        idno: '', 
        idtype: '', 
        bvn: '', 
        institutionLocation: '', 
        institutionState: '', 
        institutionAddress: '', 
        institutionLGA: '', 
        institutionPhone: '',
    });

    //Getting Current Time and Date 
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;

    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }       
    
    const registerInstitution = (e) => {
        e.preventDefault();
        const { 
            institutionName, institutionEmail, institutionID, institutionType,merchantAccount, merchantWalletID, 
            merchantBank, acquiringBank, idno, idtype, bvn, institutionLocation, 
            institutionState, institutionAddress, institutionLGA, institutionPhone
         } = state;
        const reqBody = {
            id: '100',
            institutionName: institutionName, 
            institutionEmail: institutionEmail, 
            institutionID: institutionID, 
            institutionType: institutionType,
            merchantAccount: merchantAccount, 
            merchantWalletID: merchantWalletID, 
            merchantBank: merchantBank, 
            acquiringBank: acquiringBank, 
            idno: idno, 
            idtype: idtype, 
            bvn: bvn, 
            institutionLocation: institutionLocation, 
            institutionState: institutionState, 
            institutionAddress: institutionAddress, 
            institutionLGA: institutionLGA, 
            institutionPhone: institutionPhone,
            createdBy: 'Admin', 
            dateCreated: dateTime
        };
        if (
            institutionName.trim() === '' || institutionEmail.trim() === '' || institutionID.trim() === '' || institutionType.trim() === '' || merchantAccount.trim() === '' || merchantWalletID.trim() === '' || merchantBank.trim() === '' || acquiringBank.trim() === '' || idno.trim() === '' || idtype.trim() === '' || institutionPhone.trim() === '' || bvn.trim() === '' || institutionLocation.trim() === '' || institutionState.trim() === '' || institutionAddress.trim() === '' || institutionLGA.trim() === ''
            ){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'Please fill all fields!'
            })
        } else {
            fetch(`${baseUrl}/api/institution`, {
                method: 'post',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
          .then(response => response.json())
            .then(result => {
                // console.log(result)
                if(result.respCode === '00'){
                    Swal.fire({
                        type: 'success',
                        title: 'Successful Registration...',
                        text: 'Institution Registration was Successful!'
                    })
                    history.push('/dashboard');
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${result.code}`,
                        footer: 'Please contact support'
                    })
                }                
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                    footer: 'Please contact support'
                })
            });
        }
    }

    const { isAuthenticated } = useContext(authContext);
    const history = useHistory();
    if(!isAuthenticated){
        history.push('/')
    }

    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Institution Registration</h1>
            </div>
            <div className="row">
                <div className="col-md-12">
                <form onSubmit={registerInstitution}>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Institution Name</p>
                            <input 
                                type="text" 
                                value={state.institutionName}
                                name="institutionName" 
                                onChange={onChange}
                                required 
                                className="form-control" 
                                placeholder="Institution Name" 
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Institution Email</p>
                            <input 
                                type="text" 
                                value={state.institutionEmail}
                                name="institutionEmail" 
                                onChange={onChange}
                                required                                 
                                className="form-control" 
                                placeholder="Institution Email" 
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Institution ID</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Institution ID" 
                                value={state.institutionID} 
                                name="institutionID"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Institution Type</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Institution Type" 
                                value={state.institutionType} 
                                name="institutionType"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Merchant Account</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Merchant Account" 
                                value={state.merchantAccount} 
                                name="merchantAccount"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant Wallet ID</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Merchant Wallet ID" 
                                value={state.merchantWalletID} 
                                name="merchantWalletID"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Merchant Bank</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Merchant Bank"
                                value={state.merchantBank} 
                                name="merchantBank"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Acquiring Bank</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Acquiring Bank"
                                value={state.acquiringBank} 
                                name="acquiringBank"
                                onChange={onChange}
                                required                                 
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>ID Number</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="ID Number"
                                value={state.idno} 
                                name="idno"
                                onChange={onChange}
                                required                                 
                            />
                        </div>
                        <div className="col-md-6">
                            <p>ID Type</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="ID Type" 
                                value={state.idtype}
                                name="idtype" 
                                onChange={onChange}
                                required                                
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>BVN</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="BVN" 
                                value={state.bvn} 
                                name="bvn"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Institution Location</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Institution Location" 
                                value={state.institutionLocation} 
                                name="institutionLocation"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Institution State</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Institution State" 
                                value={state.institutionState} 
                                name="institutionState"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Institution Address</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Institution Address" 
                                value={state.institutionAddress} 
                                name="institutionAddress"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Institution LGA</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Institution LGA" 
                                value={state.institutionLGA} 
                                name="institutionLGA"
                                onChange={onChange}
                                required                                
                            />
                        </div>
                        <div className="col-md-6">
                            <p>Institution Phone</p>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Institution Phone"
                                value={state.institutionPhone} 
                                name="institutionPhone"
                                onChange={onChange}
                                required                                 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <button 
                            type="input"
                            className="btn btn-primary" 
                        >
                            Create
                        </button>
                    </div>
                    
                </form>
        
                </div>
            </div>
        </Layout>
    )
}
export default withTimeout(InstitutionRegistration);