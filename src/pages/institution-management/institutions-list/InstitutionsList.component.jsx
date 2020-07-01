import React, { useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { Link } from 'react-router-dom';
import './InstitutionsList.styles.scss';
import {allInstitutionsList, changeGlobalSettings} from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

import PreLoader from '../../../components/PreLoader/Preloader.component';
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import NoResultFound from '../../../components/NoResultFound/NoResultfound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const {authToken} = JSON.parse(sessionStorage.getItem('userDetails'))

const InstitutionsList = () => {
    const [state, setState] = useState({
        page: 0,
        size: 20,
        totalCount: 0,
        switchButton: false,
        disableSwitchButton: false,
        id:0
    })
    const [institutionsList, setInstitutionsList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {
        const reqBody = {
            page: state.page,
            size: state.size
        }
        axios({
            url: `${allInstitutionsList}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                'Bearer': authToken
            },
            data: reqBody,
            timeout: FetchTimeOut
        })
            .then(result => {
             
            setIsLoading(false)
            if(result.data.respCode === '00'){
                setInstitutionsList(result.data.respBody.institution)
                
                setState(state =>({
                    ...state,
                    totalCount: result.data.respBody.totalCount,
                    
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

     
      
    }, [state.page, state.size])

    const changeCurrentPage = (pageNumber) => {
        setState({
            ...state, 
            page: pageNumber - 1
        })
    }

    const onSwitchChange = async(institutionID, globalSetting) => {
        let value;
        if (globalSetting){
            value =  false;
        } else {
            value = true;
        }
        globalSettingsActivation(value, institutionID)
    }

    const globalSettingsActivation = async (value, institutionID) => {
        setState({
            ...state,
            disableSwitchButton: true
        })

        const req ={
            institutionID,
            value
        }
       
        axios({
            url: `${changeGlobalSettings}`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                'Bearer': authToken,
                
            },
            data: req,
            timeout: FetchTimeOut
        })
        .then(result => {
            // console.log(result)
            setState(state =>({
                ...state,
                isLoading: false,
                disableSwitchButton: false
            }))
            if(result.data.respCode === '00'){
               
                const updatedInstitution = result.data.respBody;
                const allInstitutions = [...institutionsList];
                const indexOfInstituion = allInstitutions.findIndex(institution => institution.institutionID === updatedInstitution.institutionID);
                allInstitutions[indexOfInstituion] = updatedInstitution;
               
                setInstitutionsList(allInstitutions);              
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
            disableSwitchButton: false,
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

    

    const { page, size, totalCount, disableSwitchButton} = state;

    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                <div className="page-content">
                    <div className="table-layout">
                        <h3>List of Institutions</h3>
                        <div>
                            <table className="table table-striped" id="table-to-xls">
                                <thead>
                                    <tr>
                                    <th scope="col">S/N</th>
                                    <th scope="col">Institution Name</th>
                                    <th scope="col">Institution Email</th>
                                    <th scope="col">Institution ID</th>
                                    <th scope="col">Settlement Account</th> 
                                    <th scope="col">Institution Phone</th>                                               
                                    <th scope="col">Created By</th>
                                    <th scope="col">Date Created</th>
                                    <th scope="col">View</th>
                                    <th scope="col">Global Settings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        institutionsList.length === 0 ?
                                        <NoResultFound /> :
                                        institutionsList.map((institution, index) => {
                                            const { 
                                                institutionName, institutionEmail, institutionID, settlementAccount, globalSetting, institutionPhone, createdBy, dateCreated
                                            } = institution;
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{institutionName}</td>
                                                    <td>{institutionEmail}</td>
                                                    <td>{institutionID}</td>
                                                    <td>{settlementAccount}</td>
                                                    <td>{institutionPhone}</td>
                                                    <td>{createdBy}</td>
                                                    <td>{dateCreated ? dateCreated.substring(0,19) : null}</td>
                                                    <td>
                                                        <Link to={`/institution-list/${institutionID}`}><FontAwesomeIcon icon="eye" /></Link>
                                                    </td>
                                                    <td>
                                                    <span className="switchButton" onClick={()=>onSwitchChange(institutionID, globalSetting)}  > 
                                                        <input type="checkbox" checked={globalSetting} disabled={disableSwitchButton} readOnly /> 
                                                        <span className={`slider round ${disableSwitchButton ? 'disabled' : ''}`}></span>
                                                    </span>
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
export default withTimeout(InstitutionsList);