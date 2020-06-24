import React, {Fragment}from 'react';
import withTimeout from '../../HOCs/withTimeout.hoc';
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Layout from '../../components/Layout/layout.component';
import IsLoadingData from '../../components/isLoadingData/isLoadingData';

const Audit = () => {
    
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Audit</h1>
            </div>
            <div className="page-content">
                <div className="table-layout">
                       
                        {/* <div className="overflow-auto">
                            <div className="d-flex justify-content-between">
                                <select className="custom-select mx-2" name="size" required >
                                    <option value="20">Sort by size</option>
                                    <option value="50">50 Results</option>
                                    <option value="100">100 Results</option>
                                    <option value="200">200 Results</option>
                                    <option value="500">500 Results</option>
                                    <option value="1000000">All</option>                                
                                </select>
                                <input type="text" name="terminalID" className="form-control mx-2" placeholder="Filter by Terminal ID" />
                                <input type="text" name="tranID" className="form-control mx-2" placeholder="Filter by Tran ID" />
                                <input type="text" name="statusCode" className="form-control mx-2" placeholder="Filter by Status Code" />
                                <select className="custom-select mx-2" name="status" required >
                                    <option value={null}>Sort by Status</option>
                                    <option value="success">Success</option>
                                    <option value="failed">Failed</option>                               
                                </select>
                            </div> */}
                            {/* {
                                isLoading ? 
                                <IsLoadingData />
                                : */}
                                <Fragment>
                                    <table className="table table-striped overflow-auto" id="table-to-xls">
                                        <thead>
                                            <tr>
                                            <th scope="col">S/N</th>
                                            <th scope="col">Institution</th>
                                            <th scope="col">User</th>
                                            <th scope="col">Action</th>
                                            <th scope="col">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* { 
                                                transactions.length === 0 ? 
                                                <NoResultFound />
                                                :
                                                transactions.map((transaction, i) => {
                                                    const { terminalID, amount, rrn, dateTime, status, stan, pan, responseDesc, responseCode, institutionID, id, institutionResponseCode, institutionResponseDesc } = transaction;
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
                                                            <td>{institutionResponseCode}</td>
                                                            <td>{institutionResponseDesc}</td>
                                                            <td>{dateTime ? dateTime.substring(0, 19) : null}</td>
                                                        </tr>
                                                    )
                                                })
                                            } */}
                                        </tbody>
                                    </table>
                                    <Pagination
                                        // currentPage={page + 1}
                                        // totalSize={totalCount}
                                        // sizePerPage={size}
                                        // changeCurrentPage={changeCurrentPage}
                                        numberOfPagesNextToActivePage={2}
                                        theme="bootstrap"
                                    />
                                </Fragment>
                            {/* } */}
                            
                        </div>
           
            </div>
        </Layout>
    )
}
export default withTimeout(Audit);