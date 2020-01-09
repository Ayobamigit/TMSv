import React, { useContext, Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { DashboardContext } from '../../pages/dashboard/Dashboard.component';
import IsLoadingData from '../isLoadingData/isLoadingData';

export default function ChartFrame() {
    const { data: {success, failed, institutions, totalTransactions}, terminalsStatistics: {allTerminals, activeTerminals, inactiveTerminals}, fetchingTransactions } = useContext(DashboardContext);
        const data = {
            labels: ['Successful Transactions', 'Failed Transactions', 'Number of Institutions', 'Number of Transactions', 'Total Terminals', 'Active Terminals', 'Inactive Terminals'],
            datasets:[
                {
                    data: [
                        success,
                        failed,
                        institutions,
                        totalTransactions,
                        allTerminals,
                        activeTerminals,
                        inactiveTerminals
                    ],
                    backgroundColor: [
                        '#59833f',
                        '#a32f80',
                        '#f39422',
                        '#ff6363',
                        '#85a8e3',
                        '#037b86',
                        '#860342',
                    ]
                }
            ]
        }
    return (
        <Fragment>
            {
                fetchingTransactions ? 
                <IsLoadingData />
                :
                <Fragment>
                    {
                        totalTransactions >= 0 ?
                        <Doughnut
                            data={data}
                            options={{
                                title: {
                                    display: true,
                                    text:'Summary of Activities',
                                    fontSize: 16
                                },
                                maintainAspectRatio: true,
                                legend:{
                                    display: false,
                                }
                            }}
                        />
                        :
                        <IsLoadingData />
                    }
                </Fragment>
            }
        </Fragment>
    )
}
