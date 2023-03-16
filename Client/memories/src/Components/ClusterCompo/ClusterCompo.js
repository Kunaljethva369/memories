import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader'
import Cards from '../Cards/Cards';
import Navbar from '../Navbar/Navbar';
import PopUp from '../PopUp/PopUp';
import Login from '../Login/Login';

function ClusterCompo() {
    const [formData, setFormData] = useState({
        id:"",
        title: "",
        subTitle: "",
        message: "",
        image: ""
    });
    const [popUp, setPopup] = useState(false);
    const [isEiditing, setIsEiditing] = useState(false);
    const [editId, setEditId] = useState([]);
    const [memories, setMemories] = useState([]);
    const [loginPopUp, setLoginPopUp] = useState(false);
    const [loader, setLoader] = useState(false);

    const openPopUp = () => {
        setPopup(true);
    }

    const closePopup = () => {
        setPopup(false);
    }

    useEffect(() => {
        // const getData = () => {
        //     setLoader(true);
        //     // axios.get('https://react-curd.onrender.com/recipe/getrecipes').then(async (res) => {
        //     axios.get('http://localhost:3001/recipe/getrecipes').then(async (res) => {
        //         const data = await res.data;
        //         setMemories(data);
        //         setLoader(false);
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        // }
        // getData();
    }, []);

    return (
        <>
            <Loader props={{ loader }} />
            <div className='container'>
                <Login props={{ loginPopUp, setLoginPopUp }} />
                <Navbar props={{ setPopup, openPopUp, setLoginPopUp, closePopup }} />
                <Cards props={{ memories, setMemories, formData, setFormData, setPopup, setIsEiditing, setEditId, setLoader }} />
                <PopUp props={{ popUp, setPopup, formData, setFormData, closePopup, memories, setMemories, isEiditing, editId, setLoader }} />
            </div>
        </>
    )
}

export default ClusterCompo