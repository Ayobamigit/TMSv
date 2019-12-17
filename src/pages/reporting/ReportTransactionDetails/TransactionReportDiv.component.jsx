import React from 'react';


export default function TransactionReportDiv({ title, value}) {
    return (
        <div className="mb-3">
            <p><b>{title}:</b> {value}</p>
        </div>
    )
}
