import React from 'react';
import withTimeout from '../../HOCs/withTimeout.hoc';

import Layout from '../../components/Layout/layout.component';

const Audit = () => {
    
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2">Audit</h1>
            </div>
            <div className="page-content">
            </div>
        </Layout>
    )
}
export default withTimeout(Audit);