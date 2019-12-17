import React, { useContext } from 'react';
import './DashboardTransactionHistory.styles.scss';
import { DashboardContext } from "../../pages/dashboard/Dashboard.component";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import NoResultFound from '../NoResultFound/NoResultfound';

export default function () {
    const { transactionsList: { transactions }, page, totalCount, size, changeCurrentPage } = useContext(DashboardContext);
        return (
            <div className="table-layout overflow-auto">
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
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                transactions.length === 0 ? 
                                <NoResultFound />
                                :
                                transactions.map((transaction, i) => {
                                    const { terminalID, amount, rrn, dateTime, status, responseCode, responseDesc } = transaction;
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
                                            <td>{dateTime ? dateTime.substring(0, 19) : null}</td>
                                            <td>{terminalID}</td>
                                            <td>{amount}</td>
                                            <td>{rrn}</td>
                                            <td>{responseCode}</td>
                                            <td><p className={statusClass()}>{responseDesc}</p></td>
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
        )
    
}
