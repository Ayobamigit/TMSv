import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { DashboardContext } from '../../pages/dashboard/Dashboard.component';

export default function ChartFrame() {
    const { data: {success, failed, institutions, totalTransactions} } = useContext(DashboardContext);
        const data = {
            labels: ['Success', 'Failed', 'Institutions', 'Transactions'],
            datasets:[
                {
                    // label:'Population',
                    data: [
                        success,
                        failed,
                        institutions,
                        totalTransactions
                    ],
                    backgroundColor: [
                        '#28a745',
                        '#dc3545',
                        '#222876',
                        '#ffc107'
                        // 'rgba(54, 162, 235, 0.6)',
                        // 'rgba(255, 206, 86, 0.6)',
                        // 'rgba(75, 192, 192, 0.6)',
                    ]
                }
            ]
        }
    return (
        <Doughnut
            data={data}
            options={{
                // type: 'horizontal-bar',
                title: {
                    display: true,
                    text:'Summary of Activities',
                    fontSize: 16
                },
                maintainAspectRatio: false,
                legend:{
                    display: true,
                    position: 'bottom'
                }
            }}
        />
    )
}
