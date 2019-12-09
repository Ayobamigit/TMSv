import React, { useState, createContext, useEffect } from 'react';
import withTimeout from '../../HOCs/withTimeout.hoc';
import './Dashboard.styles.scss';
import Layout from '../../components/Layout/layout.component';
import Chart from '../../components/Chart/Chart.component';
import axios from 'axios';
import Swal from '../../constants/swal';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import DashboardCardsList from '../../components/DashboardCardsList/DashboardCardsList.component';
import DashboardTransactionHistoryComponent from '../../components/DashboardTransactionHistory.component.jsx/DashboardTransactionHistory.component';

// Context for Authentication
import { FetchTimeOut } from '../../Utils/FetchTimeout';
import { transactionsHistoryURL } from '../../Utils/URLs';

export const DashboardContext = createContext();

const Dashboard = () => {
    const [state, setState ] = useState({
        data: {
            activeDevices: 80,
            inactiveDevices: 75,
            transfers: 119,
            deposits: 150,
            withdrawals: 120,
            billPayments: 160
        },
        isLoading: false,
        page: 0,
        size: 10,
        fromDate: '',
        toDate: ''
    })

    const [ transactionsList, setTransactionsList ] = useState({
        transactions: [],
        totalCount: 0,
        hasNextRecord: false
    })
    const { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));
    const { data, page, size, isLoading, toDate, fromDate } = state;

    useEffect(() => {
        const getTransactionsHistory = () => {
            let reqBody = {
                fromDate,
                institutionID: "",
                page,
                size,
                toDate
            }
            setState(state =>({
                ...state,
                isLoading: true
            }))
            axios({
                url: `${transactionsHistoryURL}`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                data: reqBody,
                timeout: FetchTimeOut
            })
            .then(result => {
                setState(state =>({
                    ...state,
                    isLoading: false
                }))
                if(result.data.respCode === '00'){
                    const { transactions, totalCount, hasNextRecord } = result.data.respBody;
                    setTransactionsList(transactionsList =>({
                        ...transactionsList,
                        transactions,
                        totalCount,
                        hasNextRecord
                    }))
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${result.data.respDescription}`,
                        footer: 'Please contact support'
                    })
                }            
            })
            .catch(err => {
                setState(state =>({
                    ...state,
                    isLoading: false
                }))
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                    footer: 'Please contact support'
                })
            });
        }
        getTransactionsHistory();

        //Autorefresh Function 

        const interval = setInterval(() => {
            getTransactionsHistory();
        }, 30000)

        // Clearing autorefresh function when component unmounts
        return(() => {
            clearInterval(interval)
        })
    }, [page, size, authToken, fromDate, toDate])

    const changeCurrentPage = (pageNumber) => {
        setState({
            ...state, 
            page: pageNumber - 1
        })
    }

    
    const customFileName = `tms-dashboard-report-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`;
    
    const { totalCount } = transactionsList;
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
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
            <div className="page-content mt-5">
                <DashboardContext.Provider value={{
                    data,
                    transactionsList,
                    isLoading,
                    page,
                    totalCount,
                    size,
                    changeCurrentPage
                }}>
                    <div id="alignChartAndCards">
                        <div id="chart">
                            <Chart />  
                        </div>
                        <div>
                            <DashboardCardsList />
                        </div>
                    </div>
                    <DashboardTransactionHistoryComponent />
                </DashboardContext.Provider>
            </div>
        </Layout>
    )
}
export default withTimeout(Dashboard)