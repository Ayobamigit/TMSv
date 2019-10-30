import React, { useContext } from 'react';
import withTimeout from '../../HOCs/withTimeout.hoc';
import './Dashboard.styles.scss';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/Layout/layout.component';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import DashboardCardsList from '../../components/DashboardCardsList/DashboardCardsList.component';
import DashboardTransactionHistoryComponent from '../../components/DashboardTransactionHistory.component.jsx/DashboardTransactionHistory.component';

// Context for Authentication
import { authContext } from '../../Context/Authentication.context';

const Dashboard = () => {
    const history = useHistory();
    const { isAuthenticated } = useContext(authContext)
    const customFileName = `tms-dashboard-report-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`;
    
    if(!isAuthenticated){
        history.push('/')
    }
    
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="btn btn-sm btn-outline-secondary"
                        table="table-to-xls"
                        filename={customFileName}
                        sheet="tablexls"
                        buttonText="Export to Excel"
                    />
                    </div>
                </div>
            </div> 
            <DashboardCardsList />
            <DashboardTransactionHistoryComponent />
        </Layout>
    )
}
export default withTimeout(Dashboard)