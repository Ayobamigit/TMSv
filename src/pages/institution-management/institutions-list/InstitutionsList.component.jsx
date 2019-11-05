import React, { useState, useEffect, useContext } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { Link, useHistory } from 'react-router-dom';
import './InstitutionsList.styles.scss';
import baseUrl from '../../../constants/baseurl';
import Swal from '../../../constants/swal';

// Context for Authentication
import { authContext } from '../../../Context/Authentication.context';

import PreLoader from '../../../components/PreLoader/Preloader.component';
import Layout from '../../../components/Layout/layout.component';

const InstitutionsList = () => {
    const [institutionsList, setInstitutionsList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {
        fetch(`${baseUrl}/api/institution`)
          .then(response => response.json())
            .then(result => {
            setIsLoading(false)
                if(result.respCode === '00'){
                    setInstitutionsList(result.respBody)
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${result.respDescription}`,
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
                                <th scope="col">Institution Type</th>
                                <th scope="col">Merchant Account</th>
                                <th scope="col">Merchant Wallet ID</th>
                                <th scope="col">Merchant Bank</th>
                                <th scope="col">Acquiring Bank</th> 
                                <th scope="col">ID Number</th>
                                <th scope="col">ID Type</th> 
                                <th scope="col">BVN</th>                      
                                <th scope="col">Institution Location</th>
                                <th scope="col">Institution State</th>
                                <th scope="col">Institution Address</th>
                                <th scope="col">Institution LGA</th>
                                <th scope="col">Institution Phone</th>                                               
                                <th scope="col">Created By</th>
                                <th scope="col">Date Created</th>
                                <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    institutionsList.map((institution, index) => {
                                        const { 
                                            id, institutionName, institutionEmail, institutionID, institutionType,merchantAccount, merchantWalletID, 
                                            merchantBank, acquiringBank, idno, idtype, bvn, institutionLocation, 
                                            institutionState, institutionAddress, institutionLGA, institutionPhone, createdBy, dateCreated
                                        } = institution;
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{id}</th>
                                                <td>{institutionName}</td>
                                                <td>{institutionEmail}</td>
                                                <td>{institutionID}</td>
                                                <td>{institutionType}</td>
                                                <td>{merchantAccount}</td>                                        
                                                <td>{merchantWalletID}</td>
                                                <td>{merchantBank}</td>
                                                <td>{acquiringBank}</td>
                                                <td>{idno}</td>
                                                <td>{idtype}</td>
                                                <td>{bvn}</td>
                                                <td>{institutionLocation}</td>
                                                <td>{institutionState}</td>
                                                <td>{institutionAddress}</td>
                                                <td>{institutionLGA}</td>
                                                <td>{institutionPhone}</td>
                                                <td>{createdBy}</td>
                                                <td>{dateCreated}</td>
                                                <td>
                                                    <Link to={`/institution-list/${institutionID}`}><i className="fas fa-eye"></i></Link>
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