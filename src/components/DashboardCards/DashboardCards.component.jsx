import React from 'react';
import './DashboardCards.styles.scss';

export default function ( { name, value}) {
    return (
        <div className="card">
            <h6 className="titles"> {name} </h6>
            <h6 className="values"> {value} </h6>
        </div>
    )
}
