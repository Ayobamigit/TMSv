import React from 'react'

export default function ProgressBar({ percentage }) {
    return (
        <div class="progress">
            <div 
                class="progress-bar progress-bar-striped bg-success" 
                role="progressbar" 
                style={{width: `${percentage}%`}} 
            >
                {percentage}%
            </div>
        </div>
    )
}
