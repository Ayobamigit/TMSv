import React, { useState, useEffect, Fragment } from 'react';
import withTimeout from '../../HOCs/withTimeout.hoc';
import './Reporting.styles.scss';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/Layout/layout.component';

import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import axios from "axios";
import NoResultFound from '../../components/NoResultFound/NoResultfound';
import Swal from '../../constants/swal';
import { FetchTimeOut } from '../../Utils/FetchTimeout';
import { transactionsHistoryURL } from '../../Utils/URLs';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import IsLoadingData from '../../components/isLoadingData/isLoadingData';

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
    const [searchValues, setSearchValues] = useState({
        terminalID: '',
        statusCode: '',
        tranID: '',
        status: ''
    })
    const onChange = (e) => {
        if(e.target.name === 'size'){
            setState({
                ...state,
                size: e.target.value
            })
            return;
        }
        setSearchValues({
            ...searchValues,
            [e.target.name] : e.target.value
        })
    }
    const history= useHistory();
    const { totalCount, page, size, fromDate, toDate, isLoading } = state;
    let { transactions } = state;
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

        // const interval = setInterval(() => {
        //     getTransactionsHistory();
        // }, 30000)

        // Clearing autorefresh function when component unmounts
        // return(() => {
        //     clearInterval(interval)
        // })
    }, [page, size, authToken, fromDate, toDate])

    const changeCurrentPage = (pageNumber) => {
        setState({
            ...state, 
            page: pageNumber - 1
        })
    }

    //Filter by Terminal ID
    transactions = transactions.filter(transaction => {
        return (transaction.terminalID.toLowerCase()).includes(searchValues.terminalID.toLowerCase())
    });

    //Filter by Tran ID and RRN
    transactions = transactions.filter(transaction => {
        return (transaction.rrn.toLowerCase()).includes(searchValues.tranID.toLowerCase())
    });

    //Filter by Status Code
    transactions = transactions.filter(transaction => {
        return (transaction.responseCode.toLowerCase()).includes(searchValues.statusCode.toLowerCase())
    });

    // //Filter by Status 
    transactions = transactions.filter(transaction => {
        if(transaction.status){
            return (transaction.status.toLowerCase()).includes(searchValues.status.toLowerCase())
        } else {
            return transaction;
        }
    });

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
                    <div className="overflow-auto">
                        <div className="d-flex justify-content-between">
                            <select className="custom-select mx-2" name="size" value={state.size} onChange={onChange} required >
                                <option value="20">Sort by size</option>
                                <option value="50">50 Results</option>
                                <option value="100">100 Results</option>
                                <option value="200">200 Results</option>
                                <option value="500">500 Results</option>
                                <option value="1000000">All</option>                                
                            </select>
                            <input type="text" name="terminalID" value={searchValues.terminalID} className="form-control mx-2" placeholder="Filter by Terminal ID" onChange={onChange} />
                            <input type="text" name="tranID" value={searchValues.tranID} className="form-control mx-2" placeholder="Filter by Tran ID" onChange={onChange} />
                            <input type="text" name="statusCode" value={searchValues.statusCode} className="form-control mx-2" placeholder="Filter by Status Code" onChange={onChange} />
                            <select className="custom-select mx-2" name="status" value={searchValues.status} onChange={onChange} required >
                                <option value={null}>Sort by Status</option>
                                <option value="success">Success</option>
                                <option value="failed">Failed</option>                               
                            </select>
                        </div>
                        {
                            isLoading ? 
                            <IsLoadingData />
                            :
                            <Fragment>
                                <table className="table table-striped overflow-auto" id="table-to-xls">
                                    <thead>
                                        <tr>
                                        <th scope="col">S/N</th>
                                        <th scope="col">Terminal Id</th>
                                        <th scope="col">Institution Id</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Tran Id</th>
                                        <th scope="col">STAN</th>
                                        <th scope="col">PAN</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Code</th>
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
                                                const { terminalID, amount, rrn, dateTime, status, stan, pan, responseDesc, responseCode, institutionID, id } = transaction;
                                                const statusClass = () => {
                                                    if(status){
                                                        if (status.toLowerCase() === 'success'){
                                                            return 'success'
                                                        } else {
                                                            return 'failed'
                                                        }
                                                    }
                                                    if(responseCode === '-1'){
                                                        return 'pending'
                                                    }
                                                }
                                                return (                                                
                                                    <tr key={i} onClick={() => {history.push(`/reporting/${id}`)}}>
                                                        <th scope="row">{i+1}</th>
                                                        <td>{terminalID}</td>
                                                        <td>{institutionID}</td>
                                                        <td>{amount}</td>
                                                        <td>{rrn}</td>
                                                        <td>{stan}</td>
                                                        <td>{pan}</td>
                                                        <td>{responseDesc}</td>
                                                        <td>{responseCode}</td>
                                                        <td><p className={statusClass()}>{responseCode === '-1' ? 'Pending' : status}</p></td>
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
                            </Fragment>
                        }
                        
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default withTimeout(Reporting);