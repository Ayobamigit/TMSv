import React, { useState, useRef, Fragment } from 'react';
import Axios from 'axios';
import Swal from '../../../constants/swal';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import { uploadTerminalsURL } from '../../../Utils/URLs';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import TerminalsUploadSample from '../../../assets/sampleExcelFile.xlsx';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './device-setup.styles.scss';

const FileUploadModal = () => {
    let dismissModal = useRef()
    const [state, setState] = useState({
        selectedFile: null,
        inputTypeError: false,
        uploadProgress: 0,
        uploadReport: [],
        isLoggingIn: false,
        errorMessage: ''
    })
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));

    const fileChangedHandler = (e) => {
        const file = e.target.files[0];
        setState({ 
            ...state,
            selectedFile: file,
            inputTypeError: false
        })
    }
    const uploadFile = (e) => {
        e.preventDefault();
        if(!state.selectedFile){
            setState({ 
                ...state,
                inputTypeError: true,
                errorMessage: 'Select a file to upload',
            })
        } else {
            var filePath = state.selectedFile.name;
            var allowedExtensions = /(\.xlsx|\.xls|\.xlm|\.xlt|\.xlsm|\.xltx|\.xla|\.xlam|\.xltm)$/i;
            if(!allowedExtensions.exec(filePath)){
                setState({ 
                    ...state,
                    inputTypeError: true,                    
                    errorMessage: 'Invalid File Type',
                })
            } else {
                setState({ 
                    ...state,
                    inputTypeError: false,
                    isLoggingIn: true
                })
                let formData = new FormData()
                formData.append(
                    'file',
                    state.selectedFile,
                    state.selectedFile.name
                )
                Axios.post(`${uploadTerminalsURL}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${authToken}`
                    },
                    timeout: FetchTimeOut,
                    onUploadProgress: progressEvent => {
                        setState({
                            ...state, 
                            uploadProgress: parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                        })
                    }
                })
                .then(result => {
                    setState({
                        ...state,
                        isLoggingIn: false
                    })
                    if(result.data.respCode === '00'){
                        Swal.fire({
                            type: 'success',
                            title: 'Successful Uploads...',
                            text: 'Terminal have been uploaded Successful!'
                        })
                        console.log(result.data.respBody)
                        setState({
                            ...state, 
                            uploadReport: result.data.respBody ? result.data.respBody : []
                        })
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
                    setState({
                        ...state,
                        isLoggingIn: false
                    })
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${err}`,
                        footer: 'Please contact support'
                    })
                });
            }
        }
        
    }
    const { inputTypeError, isLoggingIn, errorMessage, uploadProgress, uploadReport } = state;
    return (
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">File Upload</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                {
                    uploadReport.length ? 
                    <Fragment>
                        <div className="modal-body">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="fileToBeUploaded">Summary of Uploaded Terminals</label>
                                <div className="btn-toolbar mb-2 mb-md-0">
                                    <div className="btn-group mr-2">
                                        <ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            className="btn btn-sm btn-outline-secondary"
                                            table="table-to-xls"
                                            filename="Summary of uploaded terminals"
                                            sheet="tablexls"
                                            buttonText="Export to Excel"
                                        />
                                    </div>
                                </div>
                            </div>                            
                            <table className="table table-striped" id="table-to-xls">
                                <thead>
                                    <tr>
                                        <th scope="col">S/N</th>
                                        <th scope="col">Terminal ID</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        uploadReport.map((reportStatus, i) => {
                                            const {terminalID, savedStatus, statusDescription} = reportStatus;
                                            const statusClass = () => {
                                                if(savedStatus){
                                                    return 'success'
                                                } else {
                                                    return 'failed'
                                                }                                               
                                            }
                                            return (
                                                <tr key={i}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{terminalID}</td>
                                                    <td><p className={statusClass()}>{savedStatus ? 'Success' : 'Failed'}</p></td>
                                                    <td>{statusDescription}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> 
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-dismiss="modal"
                                ref={dismissModal}
                            >
                                Close
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                onClick={() => setState({...state, uploadReport: []})}
                            >
                                Upload More Terminals
                            </button>
                        </div>
                    </Fragment>
                    :
                    <form onSubmit={uploadFile}>
                        <div className="modal-body">
                            <label htmlFor="fileToBeUploaded">Select an excel file to upload</label>
                            <div className="form-group">
                                <input 
                                    type="file" 
                                    name="fileToBeUploaded" 
                                    id="fileToBeUploaded"
                                    onChange={fileChangedHandler}
                                />
                            </div>
                            <ProgressBar percentage={uploadProgress} />
                            <br/>
                            <a href={TerminalsUploadSample}>Download a sample excel file <i className="fa fa-file"></i></a>
                            
                            {
                                inputTypeError ? 
                                <div className="alert alert-sm alert-danger" role="alert">
                                    {errorMessage}
                                </div> 
                                : null
                            }                          
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-dismiss="modal"
                                ref={dismissModal}
                            >
                                Close
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={isLoggingIn}
                                onClick={uploadFile}
                            >
                                {
                                    isLoggingIn ? <IsFetching /> : 'Upload'
                                }
                            </button>
                        </div>
                    </form>
                }
                </div>
            </div>
        </div>
    )
}
export default FileUploadModal;