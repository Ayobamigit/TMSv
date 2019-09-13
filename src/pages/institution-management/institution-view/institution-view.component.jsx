import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import Swal from '../../../constants/swal';
import baseUrl from '../../../constants/baseurl';
import PreLoader from '../../../components/PreLoader/Preloader.component';

const InstitutionView = ({history, match}) => {
    const [state, setState ] =  useState({ 
        id: '',
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
        createdBy: '', 
        dateCreated: ''
    });
    const [readOnly, setIsReadOnly ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const getDeviceData = () => {
            fetch(`${baseUrl}/api/institution/${match.params.id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
          .then(response => response.json())
            .then(result => {
                console.log(result)
                setIsLoading(false)
                if (result.respCode === '00'){
                    const { 
                    id, institutionName, institutionEmail, institutionID, institutionType,merchantAccount, merchantWalletID, 
                    merchantBank, acquiringBank, idno, idtype, bvn, institutionLocation, 
                    institutionState, institutionAddress, institutionLGA, institutionPhone, createdBy, dateCreated
                    } = result.respBody;
                    setState(state => ({...state, 
                        id, institutionName, institutionEmail, institutionID, institutionType,merchantAccount, merchantWalletID, 
                        merchantBank, acquiringBank, idno, idtype, bvn, institutionLocation, 
                        institutionState, institutionAddress, institutionLGA, institutionPhone, createdBy, dateCreated
                    }))
                } else {                    
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${result.respDescription}`,
                        footer: 'Please contact support'
                    })
                }                
            })
            .catch(err => {
                setIsLoading(false)
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                    footer: 'Please contact support'
                })
            });
        }
        getDeviceData();
    }, [match.params.id])

    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const editFields = () => {
        setIsReadOnly(!readOnly)
    }

    const editInstitutionData = (e) => {
        e.preventDefault();
        const { 
            id, institutionName, institutionEmail, institutionID, institutionType,merchantAccount, merchantWalletID, 
            merchantBank, acquiringBank, idno, idtype, bvn, institutionLocation, 
            institutionState, institutionAddress, institutionLGA, institutionPhone, createdBy, dateCreated
         } = state;
        const reqBody = {
            id,
            institutionName, 
            institutionEmail, 
            institutionID, 
            institutionType,
            merchantAccount, 
            merchantWalletID, 
            merchantBank, 
            acquiringBank, 
            idno, 
            idtype, 
            bvn, 
            institutionLocation, 
            institutionState, 
            institutionAddress, 
            institutionLGA, 
            institutionPhone,
            createdBy, 
            dateCreated
        };
        if (
            institutionName.trim() === '' || institutionEmail.trim() === '' || institutionID.trim() === '' || institutionType.trim() === '' || merchantAccount.trim() === '' || merchantWalletID.trim() === '' || merchantBank.trim() === '' || acquiringBank.trim() === '' || idno.trim() === '' || idtype.trim() === '' || institutionPhone.trim() === '' || bvn.trim() === '' || institutionLocation.trim() === '' || institutionState.trim() === '' || institutionAddress.trim() === '' || institutionLGA.trim() === '' || createdBy.trim() === '' || dateCreated.trim() === ''
            ){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'Please fill all fields!'
            })
        } else {
            fetch(`${baseUrl}/api/institution/${match.params.id}`, {
                method: 'put',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
          .then(response => response.json())
            .then(result => {
                if(result.respCode === '00'){
                    Swal.fire({
                        type: 'success',
                        title: 'Successful Update...',
                        text: 'Institution Update was Successful!'
                    })
                    history.push('/dashboard');
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${result.respDescription}`,
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
    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Institution View</h1>
                    <button className="btn btn-sm btn-primary" onClick={editFields}>Edit Fields</button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <form onSubmit={editInstitutionData}>
                        <div className="form-row">
                            <div className="col-md-6">
                                <p>Institution Name</p>
                                <input 
                                    type="text" 
                                    value={state.institutionName}
                                    name="institutionName" 
                                    onChange={onChange}
                                    required
                                    readOnly={readOnly} 
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
                                    readOnly={readOnly} 
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly} 
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
                                    readOnly={readOnly} 
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly}
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
                                    readOnly={readOnly} 
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6">
                                <p>Created By</p>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Created By"
                                    value={state.createdBy}
                                    required
                                    readOnly 
                                />
                            </div>
                            <div className="col-md-6">
                                <p>Date Created</p>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Date Created"
                                    value={state.dateCreated}
                                    required
                                    readOnly 
                                />
                            </div>
                        </div>
                        {
                            readOnly ?
                            null :
                            <div className="form-group">
                                <button 
                                    type="input"
                                    className="btn btn-primary" 
                                >
                                    Update
                                </button>
                            </div>
                        } 
                    </form>
            
                    </div>
                </div>
                </React.Fragment>
        )
    }
}
export default withTimeout(withRouter(InstitutionView));