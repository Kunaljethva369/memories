import React from 'react';
import './Navbar.css';
import axios from 'axios';

function Navbar(setPopup) {

    const handleLogout = () => {
        setPopup.props.setLogedIn(false);
        setPopup.props.setLoader(false);
        localStorage.removeItem('token');
        axios.get("https://react-curd.onrender.com/recipe/randonrecipes").then((res) => {
            setPopup.props.setMemories(res.data.recipes);
            setPopup.props.setLoader(true);
        }).catch((err) => {
            console.log(err);
        });
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