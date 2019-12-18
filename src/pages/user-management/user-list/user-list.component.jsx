import React, { useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { Link } from 'react-router-dom';
import './user-list.styles.scss';
import {superAdminGetAllUsers} from '../../../Utils/URLs';
import Swal from '../../../constants/swal';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";

import PreLoader from '../../../components/PreLoader/Preloader.component';
import NoResultFound from "../../../components/NoResultFound/NoResultfound";
import DeleteModal from './delete-user.component';

import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';

const UsersList = () => {
    const [usersList, setUsersList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ idToDelete, setIdToDelete] = useState('')
    const {authToken} = JSON.parse(sessionStorage.getItem('userDetails'))

    useEffect(() => {
        axios({
            url: `${superAdminGetAllUsers}`,
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
                setUsersList(result.data.respBody)
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
    }, [authToken])

    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                <div className="page-content">
                    <div className="table-layout">
                        <h3>List of Users</h3>
                        <div>
                            <table className="table table-striped" id="table-to-xls">
                                <thead>
                                    <tr>
                                        <th scope="col">S/N</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Institution</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Date Created</th>
                                        <th scope="col">View</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usersList.length === 0 ? 
                                            <NoResultFound /> : 
                                            usersList.map((terminal, index) => {
                                                const { id, firstname, lastname, email, username, institution, role, datecreated } = terminal;
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index+1}</th>
                                                        <td>{firstname}</td>
                                                        <td>{lastname}</td>
                                                        <td>{email}</td>
                                                        <td>{username}</td>
                                                        <td>{institution ? institution.institutionName : null}</td>
                                                        <td>{role}</td>
                                                        <td>{datecreated ? datecreated.substring(0,19) : null}</td>
                                                        <td>
                                                            <Link to={`/user/${id}`}><i className="fa fa-eye"></i></Link>
                                                        </td>
                                                        <td>
                                                            <i className="fa fa-trash" data-toggle="modal" onClick={() => setIdToDelete(id)} data-target="#deleteModal"></i>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <DeleteModal id={idToDelete} />
                </div>
            </Layout>
        )
    }
}
export default withTimeout(UsersList);