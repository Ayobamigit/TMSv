import React, { useContext } from 'react';
import DashboardCards from '../DashboardCards/DashboardCards.component';
import './DashboardCardsList.styles.scss';
import { DashboardContext } from "../../pages/dashboard/Dashboard.component";

export default function () {
    const { data: {withdrawals, totalSuccessfulAmount, totalTransactions, failed, success, institutions} } = useContext(DashboardContext);
    return (
        <div className="cards-list">
            <DashboardCards
                name="Number of Transactions"
                value={totalTransactions}
            />

            <DashboardCards
                name="Transactions Value"
                value={totalSuccessfulAmount}
            />

            <DashboardCards
                name="Successful Transactions"
                value={success}
            />

            <DashboardCards
                name="Failed Transactions"
                value={failed}
            />

            <DashboardCards
                name="Number of Institutions"
                value={institutions}
            />

            <DashboardCards
                name="Withdrawals"
                value={withdrawals}
            />
        </div>
    )
}
