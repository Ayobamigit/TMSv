import React, { useContext, Fragment } from 'react';
import './DashboardTransactionHistory.styles.scss';
import { DashboardContext } from "../../pages/dashboard/Dashboard.component";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import NoResultFound from '../NoResultFound/NoResultfound';
import IsLoadingData from '../isLoadingData/isLoadingData';

export default function () {
    const { transactionsList: { transactions }, page, totalCount, size, changeCurrentPage, fetchingTransactions } = useContext(DashboardContext);
        return (
            <div className="page-content table-layout overflow-auto">
            <h3>Recent Transactions</h3>
            <div>
                <table className="table table-striped" id="table-to-xls">
                    <thead>
                        <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Date and Time</th>
                        <th scope="col">Terminal Id</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Tran Id</th>
                        <th scope="col">Code</th>
                        <th scope="col">Status and Description</th>
                        <th scope="col">Institution Status Code</th>
                        <th scope="col">Institution Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fetchingTransactions ? 
                            <tr>
                                <td colSpan="100">
                                    <IsLoadingData />
                                </td>
                            </tr>
                            :
                            <Fragment>
                            { 
                                transactions.length === 0 ? 
                                <NoResultFound />
                                :
                                transactions.map((transaction, i) => {
                                    const { terminalID, amount, rrn, dateTime, status, responseCode, responseDesc, institutionResponseCode, institutionResponseDesc } = transaction;
                                    const statusClass = () => {
                                        if(status){
                                            if (status.toLowerCase() === 'success'){
                                                return 'success'
                                            } else {
                                                return 'failed'
                                            }
                                        } else {
                                            return 'pending'
                                        }
                                    }
                                    return (
                                        <tr key={i}>
                                            <th scope="row">{i+1}</th>
                                            <td>{dateTime ? dateTime.substring(0, 19) : null}</td>
                                            <td>{terminalID}</td>
                                            <td>{amount}</td>
                                            <td>{rrn}</td>
                                            <td>{responseCode}</td>
                                            <td><p className={`overflow-hidden ${statusClass()}`}>{responseDesc}</p></td>
                                            <td><p>{institutionResponseCode}</p></td>
                                            <td><p>{institutionResponseDesc}</p></td>
                                        </tr>
                                    )
                                })
                            }
                            </Fragment>
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
        )
    
}
