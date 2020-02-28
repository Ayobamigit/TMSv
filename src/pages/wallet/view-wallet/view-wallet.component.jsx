import React, { useState, useEffect } from 'react';
// import { useHttp } from '../../../CustomHooks/useHttp.hooks';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import PreLoader from '../../../components/PreLoader/Preloader.component';
import Swal from '../../../constants/swal';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { getAWalletURL, updateWalletInformation } from '../../../Utils/URLs';
import { FetchTimeOut } from '../../../Utils/FetchTimeout'

// Context for Authentication
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import { manipulateNumber } from '../../../Utils/manipulateNumber';

const WalletView = () => {
    const history = useHistory();
    const match = useRouteMatch();
    const [state, setState ] =  useState({
        walletNumber: '',
        createdOn: '',
        availableBalance: '',
        ledgerBalance: '',
        minimumCharge: '', 
        maximumCharge: '', 
        feePercentage: '',
        IsFetchingData: false
    });
    const [ isLoading, setIsLoading ] = useState(true);
    const [readOnly, setIsReadOnly ] = useState(true);
    const {authToken} = JSON.parse(sessionStorage.getItem('userDetails'))

    const editFields = () => {
        setIsReadOnly(!readOnly)
    }

    useEffect(() => {
        const getWalletInformation = () => {
            axios({
                method: 'get',
                url: `${getAWalletURL}/${match.params.id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                data: match.params.id,
                timeout: FetchTimeOut
            })
            .then(result => {
                // console.log(result.data)
                setIsLoading(false)
                if(result.data.respCode === '00'){
                    const { walletNumber, createdOn, availableBalance, ledgerBalance, minimumCharge, maximumCharge, feePercentage } = result.data.respBody;
                    setState(state => ({
                        ...state, 
                        walletNumber,
                        createdOn,
                        availableBalance,
                        ledgerBalance,
                        minimumCharge, 
                        maximumCharge, 
                        feePercentage: feePercentage * 100
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
                setIsLoading(false)
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                    footer: 'Please contact support'
                })
            });
        }
        getWalletInformation();
    }, [match.params.id, authToken])

    const editWalletInformation = (e) => {
        e.preventDefault();
        const { walletNumber, minimumCharge, maximumCharge, feePercentage } = state;
        const reqBody = {
            walletNumber,
            minimumCharge, 
            maximumCharge, 
            feePercentage,
            institutionID: match.params.id,
            token: authToken,
        };
        setState({
            ...state, 
            IsFetchingData: true
        })
        axios({
            url: `${updateWalletInformation}`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            data: JSON.stringify(reqBody),
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
                    title: 'Successful Update...',
                    text: 'Wallet Update was Successful!'
                })
                history.push('/dashboard');
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
    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const { IsFetchingData, walletNumber, createdOn, availableBalance, ledgerBalance, minimumCharge, maximumCharge, feePercentage } = state;
    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                    <h1 className="h2">Wallet Information</h1>
                    <button className="btn btn-sm btn-primary" onClick={editFields}>Edit Fields</button>
                </div>
                <div className="row page-content">
                    <div className="col-md-6">
                        <form onSubmit={editWalletInformation}>
                            <div className="form-group">
                                <p>Wallet Number</p>
                                <input 
                                    name="walletNumber" 
                                    className="form-control" 
                                    value={walletNumber} 
                                    onChange={onChange}
                                    required
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <p>Available Balance</p>
                                <input 
                                    name="availableBalance" 
                                    className="form-control" 
                                    value={availableBalance} 
                                    type="number"
                                    required
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <p>Ledger Balance</p>
                                <input  
                                    type="text"
                                    name="ledgerBalance" 
                                    className="form-control" 
                                    value={ledgerBalance} 
                                    type="number"
                                    required 
                                    readOnly
                                />
                            </div>  
                            <div className="form-group">
                                <p>Minimum Charge (in naira)</p>
                                <input
                                    name="minimumCharge" 
                                    className="form-control" 
                                    value={minimumCharge} 
                                    onChange={onChange}
                                    type="number"
                                    maxLength="5"
                                    onKeyPress={(e) => manipulateNumber(e)}
                                    required 
                                    readOnly={readOnly}
                                />
                            </div> 
                            <div className="form-group">
                                <p>Maximum Charge (in naira)</p>
                                <input
                                    name="maximumCharge" 
                                    className="form-control" 
                                    value={maximumCharge} 
                                    onChange={onChange}
                                    required 
                                    maxLength="5"
                                    onKeyPress={(e) => manipulateNumber(e)}
                                    type="number"
                                    readOnly={readOnly}
                                />
                            </div> 
                            <div className="form-group">
                                <p>Charge Percentage (in %)</p>
                                <input
                                    name="feePercentage" 
                                    className="form-control" 
                                    value={feePercentage} 
                                    onChange={onChange}
                                    required 
                                    maxLength="2"
                                    min="0"
                                    step="0.001"
                                    max="100"
                                    onKeyPress={(e) => manipulateNumber(e)}
                                    type="number"
                                    readOnly={readOnly}
                                />
                            </div> 
                            <div className="form-group">
                                <p>Date Created</p>
                                <input
                                    name="createdOn" 
                                    className="form-control" 
                                    value={createdOn.substring(0, 10)} 
                                    onChange={onChange}
                                    required 
                                    type="text"
                                    readOnly
                                />
                            </div> 
                            {
                                readOnly ?
                                null :
                                <div className="form-group">
                                    <button 
                                        type="input"
                                        className="btn btn-primary" 
                                        disabled={IsFetchingData}
                                    >
                                        {
                                            IsFetchingData ? <IsFetching /> : 'Update'
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
}
export default withTimeout(WalletView);