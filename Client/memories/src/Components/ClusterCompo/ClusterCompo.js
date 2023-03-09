import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../Cards/Cards';
import Navbar from '../Navbar/Navbar';
import PopUp from '../PopUp/PopUp';

function ClusterCompo() {
    const innerData = [];
    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        message: "",
        image: ""
    });
    const [popUp, setPopup] = useState(false);
    const [memories, setMemories] = useState([]);

    const openPopUp = () => {
        setPopup(true);
    }

    const closePopup = () => {
        setPopup(false);
    }

    useEffect(() => {
        const getData = () => {
            axios.get('http://localhost:3001/getMemories').then(async (res) => {
                const data = await res.data;
                setMemories(data);
            }).catch((err) => {
                console.log(err);
            });
        }
        getData();
    }, []);

    return (
        <>
            <div className='container'>
                <Navbar props={{ setPopup, openPopUp }} />
                <Cards props={{ memories, setMemories, formData, setFormData, innerData }} />
                <PopUp props={{ popUp, setPopup, formData, setFormData, closePopup, setMemories }} />
            </div>
        </>
    )
}

export default ClusterCompo