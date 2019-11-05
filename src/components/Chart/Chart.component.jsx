import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { DashboardContext } from '../../pages/dashboard/Dashboard.component';

export default function ChartFrame() {
    const { data: {activeDevices, inactiveDevices, transfers, deposits, withdrawals, billPayments} } = useContext(DashboardContext);
        const data = {
            labels: ['Active Devices', 'Inactive Devices', 'Deposits', 'Transfers', 'Bill Payments', 'Withdrawals'],
            datasets:[
                {
                    // label:'Population',
                    data: [
                        activeDevices,
                        inactiveDevices,
                        billPayments,
                        deposits,
                        transfers,
                        withdrawals
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                    ]
                }
            ]
        }
    return (
        <Bar
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
                    display: false,
                    // position: 'bottom'
                }
            }}
        />
    )
}
