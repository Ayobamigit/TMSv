import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import Layout from '../../../components/Layout/layout.component';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import ReactToPrint from 'react-to-print';
import TransactionDetails from './TransactionDetails.component';
import {getTransactionByIdUrl} from '../../../Utils/URLs';
import { FetchTimeOut } from '../../../Utils/FetchTimeout';
import axios from 'axios';
import Swal from 'sweetalert2';
import IsLoadingData from '../../../components/isLoadingData/isLoadingData';


const ReportTransactionDetails = () => {
    const [state, setState] = useState({
        transactionDetails: {},
        isLoading: false
    })
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));
    const history = useHistory();
    const componentRef = useRef();
    const match = useRouteMatch();
    useEffect(() => {
        setState(state =>({
            ...state,
            isLoading: true
        }))
        axios({
            url: `${getTransactionByIdUrl}`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                'Bearer': authToken
            },
            timeout: FetchTimeOut,
            data: match.params.id
        })
        .then(result => {
            setState(state =>({
                ...state,
                isLoading: false
            }))
            if(result.data.respCode === '00'){
                setState(state =>({
                    ...state,
                    transactionDetails: result.data.respBody
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
    }, [authToken, match.params.id])
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h6 className="h2">Report of Transaction</h6>
            </div>
            <div className="page-content">
                {
                    state.isLoading ?
                    <IsLoadingData /> :
                    <Fragment>
                        <TransactionDetails ref={componentRef} transactionDetails={state.transactionDetails} />
                        <div className="d-flex justify-content-between">                    
                            <button className="btn btn-primary" onClick={() => history.goBack()}>Go Back</button>
                            <ReactToPrint
                                trigger={() => <button className="btn btn-success">Print</button>}
                                content={() => componentRef.current}
                            />
                        </div>
                    </Fragment>
                }                
            </div>
        </Layout>
    )
}
export default withTimeout(ReportTransactionDetails);