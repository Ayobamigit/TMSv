import React, { useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import { Link } from 'react-router-dom';
import './TerminalsList.styles.scss';

import baseUrl from '../../../constants/baseurl';
import Swal from '../../../constants/swal';
import PreLoader from '../../../components/PreLoader/Preloader.component';

const DeviceList = () => {
    const [terminalsList, setTerminalsList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {
        fetch(`${baseUrl}/api/Tms`)
          .then(response => response.json())
            .then(result => {
                setIsLoading(false)
                if(result.respCode === '00'){
                    setTerminalsList(result.respBody)
                } else {
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
    if(isLoading){
        return <PreLoader />
    } else {
        return (
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
                            <th scope="col">Terminal Status</th>
                            <th scope="col">Terminal Type</th>
                            <th scope="col">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                terminalsList.map((terminal, index) => {
                                    const { id, terminalID, terminalROMVersion, terminalSerialNo, terminalStatus, terminalType } = terminal;
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{id}</th>
                                            <td>{terminalID}</td>
                                            <td>{terminalROMVersion}</td>
                                            <td>{terminalSerialNo}</td>
                                            <td>{terminalStatus}</td>
                                            <td>{terminalType}</td>
                                            <td>
                                                <Link to={`/device-list/${terminalID}`}><i className="fas fa-eye"></i></Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            </div>
            </div>
        )
    }
}
export default withTimeout(DeviceList);