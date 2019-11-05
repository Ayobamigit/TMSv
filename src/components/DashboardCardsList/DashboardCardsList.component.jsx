import React, { useContext } from 'react';
import DashboardCards from '../DashboardCards/DashboardCards.component';
import './DashboardCardsList.styles.scss';
import { DashboardContext } from "../../pages/dashboard/Dashboard.component";

export default function () {
    const { data: {activeDevices, inactiveDevices, transfers, deposits, withdrawals, billPayments} } = useContext(DashboardContext);
    return (
        <div className="cards-list">
            <DashboardCards
                name="Active Devices"
                value={activeDevices}
            />

            <DashboardCards
                name="Inactive Devices"
                value={inactiveDevices}
            />

            <DashboardCards
                name="Bill Payments"
                value={billPayments}
            />

            <DashboardCards
                name="Deposits"
                value={deposits}
            />

            <DashboardCards
                name="Transfers"
                value={transfers}
            />

            <DashboardCards
                name="Withdrawals"
                value={withdrawals}
            />
        </div>
    )
}
