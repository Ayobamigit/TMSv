import React from 'react';
import DashboardCards from '../DashboardCards/DashboardCards.component';
import './DashboardCardsList.styles.scss';

export default function () {
    return (
        <div className="cards-list">
            <DashboardCards
                name="Active Devices"
                value="100"
            />

            <DashboardCards
                name="Inactive Devices"
                value="100"
            />

            <DashboardCards
                name="Bill Payments"
                value="100"
            />

            <DashboardCards
                name="Deposits"
                value="100"
            />

            <DashboardCards
                name="Transfers"
                value="100"
            />

            <DashboardCards
                name="Withdrawals"
                value="100"
            />
        </div>
    )
}
