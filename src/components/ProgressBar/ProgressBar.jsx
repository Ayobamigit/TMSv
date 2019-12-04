import React from 'react'

export default function ProgressBar({ percentage }) {
    return (
        <div className="progress">
            <div 
                className="progress-bar progress-bar-striped bg-success" 
                role="progressbar" 
                style={{width: `${percentage}%`}} 
            >
                {percentage}%
            </div>
        </div>
    )
}
