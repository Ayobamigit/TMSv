import React from 'react';
import './DashboardCards.styles.scss';

export default function ( { name, value}) {
    return (
        <div className="card">            
            <h4 className="values"> {value} </h4>
            <small className="titles"> {name} </small>
        </div>
    )
}
