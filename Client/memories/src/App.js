import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Components/Cards/Cards';
import Navbar from './Components/Navbar/Navbar';
import PopUp from './Components/PopUp/PopUp';

function App() {
    const [popUp, setPopup] = useState(false);
    const [memories, setMemories] = useState([]);
    const openPopUp = () => {
        setPopup(true);
    }

    const closePopup = () => {
        setPopup(false);
    }

    useEffect(() => {
        axios.get('http://localhost:3001/getMemories').then((res) => {
            setMemories(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    return (
        <>
            <div className='container'>
                <Navbar props={{ setPopup, openPopUp }} />
                <Cards props={memories} />
                <PopUp props={{ popUp, setPopup, closePopup, setMemories }} />
            </div>
        </>
    )
}

export default App;