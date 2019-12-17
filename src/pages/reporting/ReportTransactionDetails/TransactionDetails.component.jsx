import React, { Component } from 'react'
import TransactionReportDiv from './TransactionReportDiv.component';
import './TransactionDetails.styles.scss';

class TransactionDetails extends Component{
    render(){
        const { transactionDetails: {amount, dateTime, institutionID, pan, responseCode, responseDesc, rrn, stan, status, terminalID }} = this.props;
        return (
            <div className="transaction-receipt">
                <TransactionReportDiv 
                    title="Date and Time"
                    value={dateTime}
                />
                <TransactionReportDiv 
                    title="Amount"
                    value={amount}
                />
                <TransactionReportDiv 
                    title="Institution ID"
                    value={institutionID}
                />
                <TransactionReportDiv 
                    title="Terminal ID"
                    value={terminalID}
                />
                <TransactionReportDiv 
                    title="Status"
                    value={status}
                />
                <TransactionReportDiv 
                    title="PAN"
                    value={pan}
                />
                <TransactionReportDiv 
                    title="Response Code"
                    value={responseCode}
                />
                <TransactionReportDiv 
                    title="Response Description"
                    value={responseDesc}
                />
                <TransactionReportDiv 
                    title="RRN"
                    value={rrn}
                />
                <TransactionReportDiv 
                    title="STAN"
                    value={stan}
                />
            </div>
        )
    }
}
export default TransactionDetails;