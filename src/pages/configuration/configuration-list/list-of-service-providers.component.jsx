import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NoResultFound from '../../../components/NoResultFound/NoResultfound';
import DeleteServiceProvider from './deleteServiceProvider.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListOfServiceProvidersComponent = ({ isLoading, serviceProviders }) => {
    const [state, setState ] = useState({
        idToBeDeleted: ''
    })
    // if(isLoading){
    //     return <IsLoadingData />
    // } else 
    // {
        return (
            <div>
                <div className="table-layout">
                    <h3>List of Service Providers</h3>
                    <div>
                        <table className="table table-striped" id="table-to-xls">
                            <thead>
                                <tr>
                                    <th scope="col">S/N</th>
                                    <th scope="col">Name of Service Provider</th>
                                    <th scope="col">Delete</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    serviceProviders.length === 0 ? 
                                    <NoResultFound />
                                    :
                                    serviceProviders.map((serviceProvider, i) => {
                                        const { providerName, id } = serviceProvider;                                        
                                        return (
                                            <tr key={i}>
                                                <th scope="row">{i+1}</th>
                                                <td>{providerName}</td>
                                                <td data-toggle="modal" data-target="#deleteModal" onClick={() => setState({...state, idToBeDeleted: id})}><Link to="#"><FontAwesomeIcon icon="trash" size="2x" /></Link></td>
                                                <td>
                                                    <Link to={`/configuration/${id}`}><FontAwesomeIcon icon="eye" size="2x" /></Link>
                                                </td>                                                
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <DeleteServiceProvider id={state.idToBeDeleted} />
            </div>
        )
    // }
}
export default ListOfServiceProvidersComponent;