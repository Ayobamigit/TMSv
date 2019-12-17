import React, { Fragment } from 'react';
import './DashboardCards.styles.scss';
import IsLoadingData from '../isLoadingData/isLoadingData';

export default function ( { name, value}) {
    return (
        <div className="card"> 
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
