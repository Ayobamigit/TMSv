import React, { useState, useEffect, Fragment}from 'react';
import withTimeout from '../../HOCs/withTimeout.hoc';
import Pagination from "react-pagination-js";
import {getAllAudit, getInstitutionAudit} from "../../Utils/URLs"
import "react-pagination-js/dist/styles.css";
import Layout from '../../components/Layout/layout.component';
import IsLoadingData from '../../components/isLoadingData/isLoadingData';
import axios from 'axios';
import NoResultFound from '../../components/NoResultFound/NoResultfound'
import { FetchTimeOut } from '../../Utils/FetchTimeout';
import Swal from '../../constants/swal'

const Audit = () => {
    const [state, setState] = useState({
        audits: [],
        totalCount : 0,
        page: 0,
        size: 20,
        fromDate: '',
        toDate: '',
        isLoading: true,
        institutionID: '',
        hasNextRecord: false
    })
    
    const [searchValues, setSearchValues] = useState({
        institutionname: '',
        username: ''
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
    const{ totalCount, page, size, fromDate, toDate, isLoading, institutionID} = state;
    let {audits} = state;
    const {authToken, institution} = JSON.parse(sessionStorage.getItem('userDetails'));

    useEffect(() =>{
       const getAudit = () =>{
           if (institution){
                let reqBody ={
                    fromDate,
                    institutionID: institution.institutionID,
                    page,
                    size,
                    toDate
                }

                axios({
                        url: `${getInstitutionAudit}`,
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`,
                            'Bearer': authToken
                        },
                        data: reqBody,
                        timeout: FetchTimeOut
                })
                .then(result =>{
                        setState(state =>({
                            ...state,
                            isLoading: false
                        }))

                        if(result.data.respCode === '00'){
                            const {totalCount, audits, hasNextRecord} = result.data.respBody;
                            setState(state =>({
                                ...state,
                                totalCount,
                                audits,
                                hasNextRecord
                            }))
                        }
                        else{
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
           else{
                let reqBody ={
                    fromDate,
                    institutionID,
                    page,
                    size,
                    toDate
                }

                axios({
                        url: `${getAllAudit}`,
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`,
                            'Bearer': authToken
                        },
                        data: reqBody,
                        timeout: FetchTimeOut
                })
                .then(result =>{ 
                        setState(state =>({
                            ...state,
                            isLoading: false
                        }))

                        if(result.data.respCode === '00'){
                            const {totalCount, audits, hasNextRecord} = result.data.respBody;
                            setState(state =>({
                                ...state,
                                totalCount,
                                audits,
                                hasNextRecord
                            }))
                        }
                        else{
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
        } 

       getAudit();

    }, [page, size, authToken, fromDate, totalCount, toDate, institutionID])

    const changeCurrentPage = (pageNumber) => {
        setState({
            ...state, 
            page: pageNumber - 1
        })
    }

    //Filter by Institution Name
    audits = audits.filter(audit =>{
        return(audit.institutionname.toLowerCase()).includes(searchValues.institutionname.toLowerCase())
    })

    // Filter by Username
    audits = audits.filter(audit =>{
        return(audit.username.toLowerCase()).includes(searchValues.username.toLowerCase())
    })

    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Audit</h1>
            </div>

            <div className="overflow-auto">
                            <div className="d-flex justify-content-between">
                                <select className="custom-select mx-2" value = {state.size} name="size" onChange= {onChange} required >
                                    <option value="20">Sort by size</option>
                                    <option value="50">50 Results</option>
                                    <option value="100">100 Results</option>
                                    <option value="200">200 Results</option>
                                    <option value="500">500 Results</option>
                                    <option value="1000000">All</option>                                
                                </select>
                                <input type="text" name="institutionname" value={searchValues.institutionname} className="form-control mx-2" placeholder="Filter by Institution Name" onChange={onChange} />
                                <input type="text" name="action" className="form-control mx-2" placeholder="Filter by Action" />
                                <input type="text" name="username" value={searchValues.username} className="form-control mx-2" placeholder="Filter by User" onChange = {onChange} />
                            </div>
                        </div>
            <div className="page-content">
                <div className="table-layout">
                       
                        
                            {
                                isLoading ? 
                                <IsLoadingData />
                                : 
                                <Fragment>
                                    <table className="table table-striped overflow-auto" id="table-to-xls">
                                        <thead>
                                            <tr>
                                            <th scope="col">S/N</th>
                                            <th scope="col">Institution</th>
                                            <th scope="col">User</th>
                                            <th scope="col">Action</th>
                                            <th scope="col">Date and Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { 
                                                audits.length === 0 ? 
                                                <NoResultFound />
                                                :
                                                audits.map((audit, i) => {
                                                    const { institutionname, username, action, dateCreated} = audit;
                                                    
                                                    return (                                                
                                                        <tr key={i} >
                                                            <th scope="row">{i+1}</th>
                                                            <td>{institutionname}</td>
                                                            <td>{username}</td>
                                                            <td>{action}</td>
                                                            <td>{dateCreated? dateCreated.substring(0, 19) : null}</td>
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
        </Layout>
    )
}
export default withTimeout(Audit);