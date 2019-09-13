import React, { Component } from 'react';
import TimeOut from '../constants/timeOut';

const withTimeout = (WrappedComponent) => {
    return class WithTimeOut extends Component {
        _isMounted = false;
        // For Setting Time Out
        clearTimeoutFunc = () => { if (this.logoutTimeout) {clearTimeout(this.logoutTimeout)}; };
        setTimeout = () => { this.logoutTimeout = setTimeout(this.logout, TimeOut); };
        resetTimeout = () => { this.clearTimeoutFunc(); this.setTimeout(); };
        logout = () => { 
            if(this._isMounted && this.props.history.push){ 
                this.props.history.push("/"); 
                alert('Your session timed out'); 
            }
            sessionStorage.clear();  
        };

        // Cancelling subscriptions
        componentWillUnmount(){
            this._isMounted = false;
        }

        componentDidMount = async () => {
            this._isMounted = true;
            // Handling timeout when there is no event
            this.events = [
                'load',
                'mousemove',
                'mousedown',
                'click',
                'scroll',
                'keypress'
            ];

            for (var i in this.events) { window.addEventListener(this.events[i], this.resetTimeout); } 
            this.setTimeout(); //End of Timeout handling
        }
        render(){
            return (
                <WrappedComponent />
            )
        }
    }
}

export default withTimeout;