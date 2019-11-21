import React from 'react';
import './isLoadingData.scss';

export default function IsLoadingData() {
    return (
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}