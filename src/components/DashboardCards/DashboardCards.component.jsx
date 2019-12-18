import React, { Fragment } from 'react';
import './DashboardCards.styles.scss';
import IsLoadingData from '../isLoadingData/isLoadingData';

export default function ( { name, value, bgColor }) {
    return (
        <div className="card" style={{background: bgColor}}> 
            {
                value.toString().length ?
                <Fragment>
                    <h4 className="values"> {value} </h4>
                    <small className="titles"> {name} </small>
                </Fragment>
                :
                <IsLoadingData />
            }           
        </div>
    )
}
