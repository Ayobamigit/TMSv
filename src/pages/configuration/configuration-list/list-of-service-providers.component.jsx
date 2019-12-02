import React from 'react';
import IsLoadingData from '../../../components/isLoadingData/isLoadingData';
import { Link } from 'react-router-dom';
import NoResultFound from '../../../components/NoResultFound/NoResultfound';

export default function ListOfServiceProvidersComponent({ isLoading, serviceProviders }) {
    if(isLoading){
        return <IsLoadingData />
    } else {
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
                                                <td>
                                                    <Link to={`/configuration/${id}`}><i className="fa fa-2x fa-eye"></i></Link>
                                                </td>                                                
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
