import React, { useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { Link } from 'react-router-dom';
import './view-all-wallets.styles.scss';
import {allWalletsList, getAWalletURL} from '../../../Utils/URLs';
import Swal from '../../../constants/swal';

import PreLoader from '../../../components/PreLoader/Preloader.component';
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import NoResultFound from '../../../components/NoResultFound/NoResultfound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const {authToken, institution} = JSON.parse(sessionStorage.getItem('userDetails'))

const WalletsList = () => {
    const [walletsList, setWalletsList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
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
    useEffect(() => {

        if(institution)
        {
          
            axios({
                method: 'post',
                url: `${getAWalletURL}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                    'Bearer': authToken
                },
                data: institution.institutionID,
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

        else{
            axios({
                url: `${allWalletsList}`,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                    'Bearer': authToken
                },
                timeout: FetchTimeOut
            })
                .then(result => {
                setIsLoading(false)
                if(result.data.respCode === '00'){
                    setWalletsList(result.data.respBody)
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

    }, [institution])

    const { walletNumber, createdOn, availableBalance, ledgerBalance, minimumCharge, maximumCharge, feePercentage } = state;

    let layout;
    if(institution){
        layout = (
            <div className="page-content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                    <h1 className="h2">Wallet Information</h1>
                </div>
                <div className="row page-content">
                    <div className="col-md-6">
                        <form >
                            <div className="form-group">
                                <p>Wallet Number</p>
                                <input 
                                    name="walletNumber" 
                                    className="form-control" 
                                    value={walletNumber} 
                                    required
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <p>Available Balance</p>
                                <input 
                                    name="availableBalance" 
                                    className="form-control" 
                                    value = {availableBalance}
                                    required
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <p>Ledger Balance</p>
                                <input  
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
                                    type="number"
                                    maxLength="5"
                                    required 
                                    readOnly
                                />
                            </div> 
                            <div className="form-group">
                                <p>Maximum Charge (in naira)</p>
                                <input
                                    name="maximumCharge" 
                                    className="form-control" 
                                    value={maximumCharge} 
                                    required 
                                    maxLength="5"
                                    type="number"
                                    readOnly
                                />
                            </div> 
                            <div className="form-group">
                                <p>Charge Percentage (in %)</p>
                                <input
                                    name="feePercentage" 
                                    className="form-control" 
                                    value={feePercentage} 
                                    required 
                                    maxLength="2"
                                    type="number"
                                    readOnly
                                />
                            </div> 
                            <div className="form-group">
                                <p>Date Created</p>
                                <input
                                    name="createdOn" 
                                    className="form-control" 
                                    value={createdOn.substring(0, 10)} 
                                    required 
                                    type="text"
                                    readOnly
                                />
                            </div>             
                        </form>
                    </div>
                </div>
            </div>
         
            )
    }

    else{
        layout = (
           
                <div className="page-content">
                    <div className="table-layout">
                        {institution?
                            <h3>Institution Wallet</h3>:
                            <h3>Institution Wallets</h3>
                        }
                        
                        <div>
                            <table className="table table-striped" id="table-to-xls">
                                <thead>
                                    <tr>
                                    <th scope="col">S/N</th>
                                    <th scope="col">Wallet Number</th>
                                    <th scope="col">Availabe Balance</th>
                                    <th scope="col">Ledger Balance</th>
                                    <th scope="col">Minimum Charge</th> 
                                    <th scope="col">Maximum Charge</th>                                               
                                    <th scope="col">Charge Percentage</th>
                                    <th scope="col">Date Created</th>
                                    <th scope="col">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        walletsList.length === 0 ?
                                        <NoResultFound /> :
                                        walletsList.map((wallet, index) => {
                                            const { walletNumber, availableBalance, ledgerBalance, minimumCharge, maximumCharge, feePercentage, createdOn} = wallet;
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{walletNumber}</td>
                                                    <td>{availableBalance}</td>
                                                    <td>{ledgerBalance}</td>
                                                    <td>{minimumCharge}</td>
                                                    <td>{maximumCharge}</td>
                                                    <td>{feePercentage * 100}%</td>
                                                    <td>{createdOn ? createdOn.substring(0,10) : null}</td>
                                                    <td>
                                                        <Link to={`/wallet/${walletNumber}`}><FontAwesomeIcon icon="eye" /></Link>
                                                    </td>
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
    }

    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                {layout}
            </Layout>)
    }
    
}
export default withTimeout(WalletsList);