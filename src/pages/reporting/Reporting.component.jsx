import React, { useState, useEffect } from 'react';
import withTimeout from '../../HOCs/withTimeout.hoc';
import './Reporting.styles.scss';

import Layout from '../../components/Layout/layout.component';

import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import axios from "axios";
import NoResultFound from '../../components/NoResultFound/NoResultfound';
import Swal from '../../constants/swal';
import { FetchTimeOut } from '../../Utils/FetchTimeout';
import { transactionsHistoryURL } from '../../Utils/URLs';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Reporting = () => {
    const [state, setState] = useState({
        transactions: [],
        totalCount: 0, 
        page: 0, 
        size: 20,
        fromDate: '',
        toDate: '',
        hasNextRecord: false
    })

    const { transactions, totalCount, page, size, fromDate, toDate } = state;
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));
    const customFileName = `tms-report-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`;

    useEffect(() => {
        const getTransactionsHistory = () => {
            let reqBody = {
                fromDate,
                institutionID: "",
                page,
                size,
                toDate
            }
            setState(state =>({
                ...state,
                isLoading: true
            }))
            axios({
                url: `${transactionsHistoryURL}`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                data: reqBody,
                timeout: FetchTimeOut
            })
            .then(result => {
                setState(state =>({
                    ...state,
                    isLoading: false
                }))
                if(result.data.respCode === '00'){
                    const { transactions, totalCount, hasNextRecord } = result.data.respBody;
                    setState(state =>({
                        ...state,
                        transactions,
                        totalCount,
                        hasNextRecord
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
        }
        getTransactionsHistory();

        //Autorefresh Function 

        const interval = setInterval(() => {
            getTransactionsHistory();
        }, 30000)

        // Clearing autorefresh function when component unmounts
        return(() => {
            clearInterval(interval)
        })
    }, [page, size, authToken, fromDate, toDate])

    const changeCurrentPage = (pageNumber) => {
        setState({
            ...state, 
            page: pageNumber - 1
        })
    }

    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Reporting</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="btn btn-sm btn-outline-secondary"
                            table="table-to-xls"
                            filename={customFileName}
                            sheet="tablexls"
                            buttonText="Export to Excel"
                        />
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="table-layout">
                    <h3>All Transactions</h3>
                    <div>
                            <table className="table table-striped" id="table-to-xls">
                                <thead>
                                    <tr>
                                    <th scope="col">S/N</th>
                                    <th scope="col">Terminal Id</th>
                                    <th scope="col">Institution Id</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Tran Id</th>
                                    <th scope="col">STAN</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Date and Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { 
                                        transactions.length === 0 ? 
                                        <NoResultFound />
                                        :
                                        transactions.map((transaction, i) => {
                                            const { terminalID, amount, rrn, dateTime, status, stan, institutionID } = transaction;
                                            const statusClass = () => {
                                                if(status){
                                                    if (status.toLowerCase() === 'success'){
                                                        return 'success'
                                                    } else {
                                                        return 'failed'
                                                    }
                                                }
                                            }
                                            return (
                                                <tr key={i}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{terminalID}</td>
                                                    <td>{institutionID}</td>
                                                    <td>{amount}</td>
                                                    <td>{rrn}</td>
                                                    <td>{stan}</td>
                                                    <td><p className={statusClass()}>{status}</p></td>
                                                    <td>{dateTime ? dateTime.substring(0, 19) : null}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <Pagination
                                currentPage={page + 1}
                                totalSize={totalCount}
                                sizePerPage={size}
                                changeCurrentPage={changeCurrentPage}
                                numberOfPagesNextToActivePage={2}
                                theme="bootstrap"
                            />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default withTimeout(Reporting);