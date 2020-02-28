import React, { useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { Link } from 'react-router-dom';
import './view-all-wallets.styles.scss';
import {allWalletsList} from '../../../Utils/URLs';
import Swal from '../../../constants/swal';

import PreLoader from '../../../components/PreLoader/Preloader.component';
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import NoResultFound from '../../../components/NoResultFound/NoResultfound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const {authToken} = JSON.parse(sessionStorage.getItem('userDetails'))

const WalletsList = () => {
    const [walletsList, setWalletsList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {

        axios({
            url: `${allWalletsList}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
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
    }, [])

    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                <div className="page-content">
                    <div className="table-layout">
                        <h3>List of Institutions and their Wallets</h3>
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
            </Layout>
    )
    }
    
}
export default withTimeout(WalletsList);