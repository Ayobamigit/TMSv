import React, { useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
// import { useHttp } from '../../../CustomHooks/useHttp.hooks';
import { Link } from 'react-router-dom';
import './TerminalsList.styles.scss';
import {allTerminals, institutionTerminals} from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

import PreLoader from '../../../components/PreLoader/Preloader.component';
import NoResultFound from "../../../components/NoResultFound/NoResultfound";

// Context for Authentication
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';

const {authToken} = JSON.parse(sessionStorage.getItem('userDetails'))

const DeviceList = () => {
    const [state, setState ] = useState({
        page: 0,
        size: 20, 
        totalCount: 0
    })
    const [terminalsList, setTerminalsList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {
        let reqBody = {
            page: state.page,
            size: state.size
        }
        axios({
            url: `${allTerminals}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            data: reqBody,
            timeout: FetchTimeOut
        })
        .then(result => {
            setIsLoading(false)
            if(result.data.respCode === '00'){
                setTerminalsList(result.data.respBody.transactions)
                setState(state => ({
                    ...state,
                    totalCount: result.data.respBody.totalCount
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
            setIsLoading(false)
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `${err}`,
                footer: 'Please contact support'
            })
        });
    }, [state.page, state.size])

    const changeCurrentPage = (pageNumber) => {
        setState({
            ...state, 
            page: pageNumber - 1
        })
    }

    const { page, size, totalCount } = state;

    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                <div className="page-content">
                    <div className="table-layout">
                        <h3>List of Devices</h3>
                        <div>
                            <table className="table table-striped" id="table-to-xls">
                                <thead>
                                    <tr>
                                    <th scope="col">S/N</th>
                                    <th scope="col">Terminal ID</th>
                                    <th scope="col">Terminal ROM Version</th>
                                    <th scope="col">Terminal Serial No</th>
                                    {/* <th scope="col">Terminal Status</th> */}
                                    <th scope="col">Terminal Type</th>
                                    <th scope="col">Date Created</th>
                                    <th scope="col">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        terminalsList.length === 0 ? 
                                            <NoResultFound /> : 
                                        terminalsList.map((terminal, index) => {
                                            const { id, terminalID, terminalROMVersion, terminalSerialNo, terminalType, dateCreated } = terminal;
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{terminalID}</td>
                                                    <td>{terminalROMVersion}</td>
                                                    <td>{terminalSerialNo}</td>
                                                    {/* <td>{terminalStatus}</td> */}
                                                    <td>{terminalType}</td>
                                                    <td>{dateCreated ? dateCreated.substring(0,19) : null}</td>
                                                    <td>
                                                        <Link to={`/device-list/${id}`}><i className="fa fa-eye"></i></Link>
                                                    </td>
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
}
export default withTimeout(DeviceList);