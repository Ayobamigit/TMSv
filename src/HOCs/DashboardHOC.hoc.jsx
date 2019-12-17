import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const dashboardHOC = (WrappedComponent) => {
    return class DashboardHOC extends Component {
        render(){
            if (!sessionStorage.getItem('userDetails')){
                return <Redirect to="/" />
            }
            return (
                <WrappedComponent />
            )
        }
    }
}

export default dashboardHOC;