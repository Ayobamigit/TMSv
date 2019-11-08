import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Swal from '../../../constants/swal';
import { FetchTimeOut } from "../../../Utils/FetchTimeout";
import { registerTerminalURL } from '../../../Utils/URLs';
import IsFetching from '../../../components/isFetching/IsFetching.component';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';

const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));

const FileUploadModal = () => {
    const history = useHistory();
    const [state, setState] = useState({
        selectedFile: null,
        inputTypeError: false,
        uploadProgress: 0,
        isLoggingIn: false,
        errorMessage: ''
    })

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
                Axios.post(`${registerTerminalURL}/upload`, formData, {
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
                            title: 'Successful Registration...',
                            text: 'Terminal Registration was Successful!'
                        })
                        history.push('/dashboard');
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
    const { inputTypeError, isLoggingIn, errorMessage, uploadProgress } = state;
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
                <form onSubmit={uploadFile}>
                    <div className="modal-body">
                        <label htmlFor="fileToBeUploaded">Select an excel file to upload</label>
                        <input 
                            type="file" 
                            name="fileToBeUploaded" 
                            id="fileToBeUploaded"
                            onChange={fileChangedHandler}
                        /> 
                        <ProgressBar percentage={uploadProgress} />
                        {
                            inputTypeError ? 
                            <div className="alert alert-sm alert-danger" role="alert">
                                {errorMessage}
                            </div> 
                            : null
                        }                          
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
                </div>
            </div>
        </div>
    )
}
export default FileUploadModal;