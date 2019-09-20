import React, { useContext } from 'react';
import withTimeout from '../../HOCs/withTimeout.hoc';
import { withRouter } from 'react-router-dom';

// Context for Authentication
import { authContext } from '../../Context/Authentication.context';
import Layout from '../../components/Layout/layout.component';

const Reporting = ({ history }) => {
    const { isAuthenticated } = useContext(authContext)
    if(!isAuthenticated){
        history.push('/')
    }
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Reporting</h1>
            </div>
        </Layout>
    )
}
export default withTimeout(withRouter(Reporting));