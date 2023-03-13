import React from 'react';
import './Loader.css';
function Loader(loader) {
    return (
        <>
            <div className={loader.props.loader ? 'loader' : 'loader hide'}>
                <div className="loader-bar"></div>
                <div className="loader-bar"></div>
                <div className="loader-bar"></div>
                <div className="loader-bar"></div>
            </div>
        </>
    )
}

export default Loader;