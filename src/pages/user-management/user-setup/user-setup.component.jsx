import React, { useState, useEffect } from 'react';
import withTimeout from '../../../HOCs/withTimeout.hoc';
import PreLoader from '../../../components/PreLoader/Preloader.component';
import Swal from '../../../constants/swal';
import { useHistory } from 'react-router-dom';
import { allInstitutions, createAUser, getRolesAndPermissions, createInstitutionUser } from '../../../Utils/URLs';
import { FetchTimeOut } from '../../../Utils/FetchTimeout'

import Layout from '../../../components/Layout/layout.component';
import axios from 'axios';
import IsFetching from '../../../components/isFetching/IsFetching.component';

const UserRegistration = () => {
    const history = useHistory();
    const [state, setState ] =  useState({
        firstname: '',
        lastname: '',
        email: '',
        institutionName: '',
        institutionsList: [],
        password: '',
        role: '',
        IsFetchingData: false,
        rolesAndPermissions: [],
        selectedRoleAndPermission: []
    });
    const [ isLoading, setIsLoading ] = useState(true);
    const [ institutionInformation, setInstitutionInformation] = useState({})
    const { authToken, institution, role } = JSON.parse(sessionStorage.getItem('userDetails'))

    useEffect(() => {
        if(role.name==='SUPER_ADMIN')
        {   
            axios({
              url: `${allInstitutions}`, 
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                        'Bearer': authToken
                    },
                    timeout: FetchTimeOut
            })
        .then(res=>{
                setIsLoading(false)

                if(res.data.respCode === '00'){
                    setState(state =>({
                        ...state,
                        institutionsList: res.data.respBody
                    }))
                }
            })

        }

         axios({
                url: `${getRolesAndPermissions}`, 
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`,
                            'Bearer': authToken
                        },
                        timeout: FetchTimeOut
                })
            .then(result1 =>{
                    setIsLoading(false)

                    if(result1.data.respCode === '00'){
                        setState(state =>({
                            ...state,
                            rolesAndPermissions: result1.data.respBody
                        }))
                    }

                    else{
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: `${result1.data.respDescription}`,
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
            
                })
        

           
    }, [authToken])

    const createUser = (e) => {
        e.preventDefault();

        if(role.name === 'SUPER_ADMIN'){
            const { firstname, lastname, email, password, role, selectedRoleAndPermission } = state;
            const reqBody = {
                id: 0,
                firstname,
                dateCreated: new Date(),
                lastname,
                email,
                password,
                token: authToken,
                role: selectedRoleAndPermission,
                institution: institutionInformation
            }
            if (firstname.trim() === '' || lastname.trim() === '' || email.trim() === '' || password.trim() === '' || role.trim() === ''){
                Swal.fire({
                    type: 'info',
                    title: 'Oops...',
                    text: 'Please fill all fields!'
                })
            } else {
                setState({
                    ...state, 
                    IsFetchingData: true
                })
                axios({
                    method: 'post',
                    url: `${createAUser}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                        'Bearer': authToken
                    },
                    data: reqBody,
                    timeout: FetchTimeOut
                })
                .then(result => {
                    setState({
                        ...state, 
                        IsFetchingData: false
                    })
                    if(result.data.respCode === '00'){
                        Swal.fire({
                            type: 'success',
                            title: 'Successful Registration...',
                            text: 'User Registration was Successful!'
                        })
                        history.push('/user-list');
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
                        IsFetchingData: false
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
        
        if(institution)
        {
            // Institution Users/Admin need not select their institution, this is done automatically using this code below
           
                let result = state.institutionsList.find((element) => {
                    return element.institutionID === institution.institutionID
                })
                setInstitutionInformation(result)
            
            const { firstname, lastname, email, password, role, selectedRoleAndPermission } = state;
            const reqBody = {
                id: 0,
                firstname,
                dateCreated: new Date(),
                lastname,
                email,
                password,
                token: authToken,
                role: selectedRoleAndPermission,
                institution: institution,
                institutionName:institution.institutionName
            }
            if (firstname.trim() === '' || lastname.trim() === '' || email.trim() === '' || password.trim() === '' || role.trim() === ''){
                Swal.fire({
                    type: 'info',
                    title: 'Oops...',
                    text: 'Please fill all fields!'
                })
            } else {
                setState({
                    ...state, 
                    IsFetchingData: true
                })
                axios({
                    method: 'post',
                    url: `${createInstitutionUser}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                        'Bearer': authToken
                    },
                    data: reqBody,
                    timeout: FetchTimeOut
                })
                .then(result => {
                    setState({
                        ...state, 
                        IsFetchingData: false
                    })
                    if(result.data.respCode === '00'){
                        Swal.fire({
                            type: 'success',
                            title: 'Successful Registration...',
                            text: 'User Registration was Successful!'
                        })
                        history.push('/user-list');
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
                        IsFetchingData: false
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

    const onChange = async (e) => {
        let name = e.target.name;
        let value = e.target.value;
        await setState({
            ...state, 
            [e.target.name]: e.target.value
        })
        
        if(name === 'institutionName'){
            let result = state.institutionsList.find((element) => {
                return element.institutionID === value
            })
            setInstitutionInformation(result)
        }

        if(name === 'role'){
            let result = state.rolesAndPermissions.find((element) => {
                return element.name === value
            })
            setState({
                ...state,
                [name]: value,
                selectedRoleAndPermission: result
            })
        }
    }

    const { IsFetchingData, rolesAndPermissions } = state;
    if(isLoading){
        return <PreLoader />
    } else {
        return (
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                    <h1 className="h2">User Registration</h1>
                </div>
                <div className="row page-content">
                    <div className="col-md-6">
                        <form onSubmit={createUser}>
                            <div className="form-group">
                                <p>First Name</p>
                                <input 
                                    name="firstname" 
                                    className="form-control" 
                                    value={state.firstname} 
                                    onChange={onChange}
                                    required                                    
                                />
                            </div>
                            <div className="form-group">
                                <p>Last Name</p>
                                <input 
                                    name="lastname" 
                                    className="form-control" 
                                    value={state.lastname} 
                                    onChange={onChange} 
                                    required                                    
                                />
                            </div>
                            <div className="form-group">
                                <p>Email</p>
                                <input  
                                    type="email"
                                    name="email" 
                                    className="form-control" 
                                    value={state.email} 
                                    onChange={onChange}
                                    required                                     
                                />
                            </div> 
                            <div className="form-group">
                                <p>Assign a password</p>
                                <input
                                    name="password" 
                                    type="password"
                                    className="form-control" 
                                    value={state.password} 
                                    onChange={onChange}
                                    required                                     
                                />
                            </div> 
                            {
                                // Institutions dont have to select their institution
                                !institution ?
                                <div className="form-group">
                                    <p>Choose Institution</p>
                                    <select className="custom-select" name="institutionName" value={state.institutionName} onChange={onChange} required >
                                        <option value="" disabled>Choose institution</option>
                                        {
                                            state.institutionsList ? 
                                            state.institutionsList.map((institution, i) => {
                                                return(
                                                    <option 
                                                        value={institution.institutionID} 
                                                        key={i}
                                                    >
                                                        {institution.institutionName}
                                                    </option>
                                                )
                                            })
                                            :null
                                        }
                                    </select>
                                </div>
                                :
                                null
                            }                            
                            <div className="form-group">
                                <p>User Role</p>
                                <select className="custom-select" name="role" value={state.role} onChange={onChange} required >
                                    <option value="" disabled>Choose role</option>
                                    {/* <option value="TELPO">TELPO</option>
                                    <option value="TOPWISE">TOPWISE</option> */}
                                    {
                                        rolesAndPermissions.length ?
                                        rolesAndPermissions.map((role, i) => {
                                            return (
                                                <option value={role.name} key={i}>{role.name}</option>
                                            )
                                        })
                                        : null
                                    }                                
                                </select>
                            </div>
                            <div className="form-group d-flex justify-content-end">
                                <button 
                                    type="input"
                                    className="btn btn-primary" 
                                    disabled={IsFetchingData}
                                >
                                    {
                                        IsFetchingData ? <IsFetching /> : 'Create'
                                    }
                                </button>
                            </div>               
                        </form>
                    </div>
                </div>
            </Layout>
        )
    }
}
export default withTimeout(UserRegistration);