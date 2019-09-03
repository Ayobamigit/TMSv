import React from 'react';
import './DashboardCards.styles.scss';

export default function ( { name, value}) {
    return (
        <div className="card">
            <h4> {name} </h4>
            <h6> {value} </h6>
        </div>
    )
}
