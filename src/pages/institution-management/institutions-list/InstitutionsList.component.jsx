import React, { useState, useEffect, useContext } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { Link, useHistory } from 'react-router-dom';
import './InstitutionsList.styles.scss';
import {allInstitutions} from '../../../Utils/URLs';
import Swal from '../../../constants/swal';

// Context for Authentication
import { authContext } from '../../../Context/Authentication.context';

import PreLoader from '../../../components/PreLoader/Preloader.component';
import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import NoResultFound from '../../../components/NoResultFound/NoResultfound';

const {authToken} = JSON.parse(sessionStorage.getItem('userDetails'))

const InstitutionsList = () => {
    const [institutionsList, setInstitutionsList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {
        axios({
            url: `${allInstitutions}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            data: {},
            timeout: FetchTimeOut
        })
            .then(result => {
            setIsLoading(false)
            if(result.data.respCode === '00'){
                setInstitutionsList(result.data.respBody)
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

    const { isAuthenticated } = useContext(authContext);
    const history = useHistory();
    if(!isAuthenticated){
        history.push('/')
    }

    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
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
                                <th scope="col">Merchant Account</th>                     
                                <th scope="col">Institution Location</th>
                                <th scope="col">Institution Address</th>
                                <th scope="col">Institution Phone</th>                                               
                                <th scope="col">Created By</th>
                                <th scope="col">Date Created</th>
                                <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    institutionsList.length === 0 ?
                                        <NoResultFound /> :
                                    institutionsList.map((institution, index) => {
                                        const { 
                                            id,institutionName, institutionEmail, institutionID, merchantAccount, institutionLocation, institutionAddress, institutionPhone, createdBy, dateCreated
                                        } = institution;
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{institutionName}</td>
                                                <td>{institutionEmail}</td>
                                                <td>{institutionID}</td>
                                                <td>{merchantAccount}</td>
                                                <td>{institutionLocation}</td>
                                                <td>{institutionAddress}</td>
                                                <td>{institutionPhone}</td>
                                                <td>{createdBy}</td>
                                                <td>{dateCreated}</td>
                                                <td>
                                                    <Link to={`/institution-list/${id}`}><i className="fa fa-eye"></i></Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
    )
    }
    
}
export default withTimeout(InstitutionsList);