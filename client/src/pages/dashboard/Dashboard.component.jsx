import React from 'react';
import './Dashboard.styles.scss';
import DashboardCardsList from '../../components/DashboardCardsList/DashboardCardsList.component';
import DashboardTransactionHistoryComponent from '../../components/DashboardTransactionHistory.component.jsx/DashboardTransactionHistory.component';

export default function () {
    return (
        <React.Fragment>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                {/* <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                </div> */}
            </div> 
            <DashboardCardsList />
            <DashboardTransactionHistoryComponent />
        </React.Fragment>
    )
}
