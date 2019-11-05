import React from 'react';
import './Preloader.styles.scss';

const PreLoader = () => {
    return(
        <React.Fragment>
            <section className="wrapper">
                <div className="spinner">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
            </section>
        </React.Fragment>
    )
}
export default PreLoader;