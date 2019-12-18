import React, { useContext } from 'react';
import DashboardCards from '../DashboardCards/DashboardCards.component';
import './DashboardCardsList.styles.scss';
import { DashboardContext } from "../../pages/dashboard/Dashboard.component";

export default function () {
    const { data: {totalSuccessfulAmount, totalTransactions, failed, success, institutions}, terminalsStatistics: {allTerminals, activeTerminals, inactiveTerminals} } = useContext(DashboardContext);
    return (
        <div className="cards-list">
            <DashboardCards
                name="Number of Transactions"
                value={totalTransactions}
                bgColor="#ff6363"
            />

            <DashboardCards
                name="Transactions Value"
                value={totalSuccessfulAmount}
                bgColor="#73bcdb"
            />

            <DashboardCards
                name="Successful Transactions"
                value={success}
                bgColor="#59833f"
            />

            <DashboardCards
                name="Failed Transactions"
                value={failed}
                bgColor="#a32f80"
            />

            <DashboardCards
                name="Number of Institutions"
                value={institutions}
                bgColor="#f39422"
            />

            <DashboardCards
                name="Total Terminals"
                value={allTerminals}
                bgColor="#85a8e3"
            />

            <DashboardCards
                name="Active Terminals"
                value={activeTerminals}
                bgColor="#037b86"
            />

            <DashboardCards
                name="Inactive Terminals"
                value={inactiveTerminals}
                bgColor="#860342"
            />
        </div>
    )
}
