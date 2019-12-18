import React, { useState, createContext, useEffect } from 'react';
import dashboardHOC from '../../HOCs/DashboardHOC.hoc';
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
import { transactionsHistoryURL, transactionsStatistics, totalNumberOfInstitutions, getNewTokenUrl, allTerminalsStatistics, activeAndInactiveTerminalsStatistics } from '../../Utils/URLs';
import TopInstitutions from '../../components/TopInstitutions/TopInstitutions.component';

export const DashboardContext = createContext();

const Dashboard = () => {
    const [state, setState ] = useState({
        data: {
            totalSuccessfulAmount: '',
            totalTransactions: '',
            failed: '',
            success: '',
            institutions: '',
        },
        terminalsStatistics: {
            allTerminals: '',
            activeTerminals: '',
            inactiveTerminals: ''
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
    const { data, page, size, isLoading, toDate, fromDate } = state;

    useEffect(() => {
        let { authToken } = JSON.parse(sessionStorage.getItem('userDetails'));

        //Get New Token when token expires
        const getNewToken = () => {
            axios.post(`${getNewTokenUrl}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                timeout: FetchTimeOut
            })
            .then (res => {
                if(res.data.respCode === '00'){
                    authToken = res.data.respBody;
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${res.data.respDescription}`,
                        footer: 'Please contact support'
                    })
                }
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                    footer: 'Please contact support'
                })
            })
        }

        //Fetch Statistics 
        const getDashboardStatistics = () => {
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

            axios.all([
                axios.get(`${transactionsStatistics}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    timeout: FetchTimeOut
                  }),
                axios.get(`${totalNumberOfInstitutions}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    timeout: FetchTimeOut
                  }),
                axios({
                    url: `${transactionsHistoryURL}`,
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    data: reqBody,
                    timeout: FetchTimeOut
                }),
                axios.get(`${activeAndInactiveTerminalsStatistics}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    timeout: FetchTimeOut
                }),
                  axios.get(`${allTerminalsStatistics}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    timeout: FetchTimeOut
                }),
              ])
              .then(axios.spread((transactionsStatistics, totalNumberOfInstitutions, transactionsHistory, activeAndInactiveTerminalsStatistics, allTerminalsStatistics) => {
                setState(state =>({
                    ...state,
                    isLoading: false
                }))                   
                  if(transactionsHistory.data.respCode === '00'){
                    const { transactions, totalCount, hasNextRecord } = transactionsHistory.data.respBody;
                    const { totalSuccessfulAmount, totalTransactions, failed, success } = transactionsStatistics.data.respBody;
                    const { activeTerminals, inactiveTerminals} = activeAndInactiveTerminalsStatistics.data.respBody;
                    setTransactionsList(transactionsList =>({
                        ...transactionsList,
                        transactions,
                        totalCount,
                        hasNextRecord
                    }))
                    setState(state => ({
                        ...state,
                        data: {
                            ...state.data,
                            totalSuccessfulAmount,
                            totalTransactions,
                            failed: failed,
                            success,
                            institutions: totalNumberOfInstitutions.data.respBody
                        },
                        terminalsStatistics: {
                            ...state.terminalsStatistics,
                            allTerminals: allTerminalsStatistics.data.respBody,
                            activeTerminals,
                            inactiveTerminals
                        },
                      }))
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `${transactionsHistory.data.respDescription}`,
                        footer: 'Please contact support'
                    })
                }                
              }))
              .catch(error => {
                  console.log(error)
                setState(state =>({
                    ...state,
                    isLoading: false
                }))            
                return getNewToken();
            });
        }
        getDashboardStatistics();

        //Autorefresh Transaction History Function  (Every thirty seconds)
        const interval = setInterval(() => {
            getDashboardStatistics();
        }, 30000)

        // Clearing autorefresh function when component unmounts. To avoid memory leaks
        return(() => {
            clearInterval(interval)
        })
    }, [page, size, fromDate, toDate])

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
            <div>
                <DashboardContext.Provider value={{
                    data,
                    terminalsStatistics: state.terminalsStatistics,
                    transactionsList,
                    isLoading,
                    page,
                    totalCount,
                    size,
                    changeCurrentPage
                }}>
                    <div className="mb-5" id="alignChartAndCards">
                        <div className="page-content" id="chart">
                            <Chart />  
                        </div>
                        <div>
                            <DashboardCardsList />
                        </div>
                    </div>
                    <TopInstitutions />
                    <DashboardTransactionHistoryComponent />
                </DashboardContext.Provider>
            </div>
        </Layout>
    )
}
export default dashboardHOC(Dashboard)