import React from 'react';
import './Navbar.css';

function Navbar(setPopup) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <a className="navbar-brand">Memories</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className='nav-item'>
                            <a className="nav-urls" onClick={setPopup.props.openPopUp} >Create Memories</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-urls">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-urls">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar