import React from 'react';
import './Navbar.css';

function Navbar(setPopup) {

    const handleLogout = () => {
        setPopup.props.setLogedIn(false);
        localStorage.removeItem('token');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <a className="navbar-brand"><img src='/Assests/favicon.png' /></a>
                <a className="nav-urls" onClick={setPopup.props.openPopUp} >Add Recipe</a>
                {
                    setPopup.props.logedIn ? <a className="nav-urls" onClick={handleLogout}>Logout</a> : <a className="nav-urls" onClick={() => { setPopup.props.setLoginPopUp(true) }}>Login / SignUp</a>
                }
            </nav>
        </>
    )
}

export default Navbar