import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Cards from '../Cards/Cards';
import Navbar from '../Navbar/Navbar';
import PopUp from '../PopUp/PopUp';
import Login from '../Login/Login';

function ClusterCompo() {


    const [formData, setFormData] = useState({
        id: "",
        title: "",
        subTitle: "",
        message: "",
        image: ""
    });
    const [popUp, setPopup] = useState(false);
    const [loader, setLoader] = useState(false);
    const [loginPopUp, setLoginPopUp] = useState(false);
    const [isEiditing, setIsEiditing] = useState(false);
    const [logedIn, setLogedIn] = useState(false);
    const [editId, setEditId] = useState([]);
    const [memories, setMemories] = useState([]);

    const openPopUp = () => {
        const tokens = localStorage.getItem('token');
        if (tokens) {
            setPopup(true);
        }
        else {
            setLoginPopUp(true);
        }
    }

    const closePopup = () => {
        setPopup(false);
    }


    const getRandomRecipes = () => {
        axios.get("https://react-curd.onrender.com/recipe/randonrecipes").then((res) => {
            setMemories(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        const getData = () => {
            setLoader(true);
            const tokens = localStorage.getItem('token');
            if (tokens) {
                const LoginedToken = JSON.parse(tokens).emailid;
                const formToken = {
                    email: LoginedToken
                }
                axios.get('https://react-curd.onrender.com/recipe/getrecipes', formToken).then(async (res) => {
                    // axios.post('http://localhost:3001/recipe/getrecipes', formToken).then(async (res) => {
                    const data = await res.data;
                    setMemories(data);
                    setLoader(false);
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                setLoader(true);
                // const getRandomRecipes = () => {
                axios.get("https://react-curd.onrender.com/recipe/randonrecipes").then((res) => {
                    // axios.get("http://localhost:3001/recipe/randonrecipes").then((res) => {
                    setMemories(res.data.recipes);
                }).catch((err) => {
                    console.log(err);
                });
            }
            console.log("LOGIN");
            setLoader(false);
            // }
        }
        getData();
        // getRandomRecipes();
        const token = localStorage.getItem('token');
        if (token) {
            setLogedIn(true);
        }
        else {
            setLogedIn(false);
        }
    }, []);

    return (
        <>
            <Loader props={{ loader }} />
            <div className='container'>
                <Login props={{ loginPopUp, setLoginPopUp, setLogedIn, setLoader, setMemories, getRandomRecipes }} />
                <Navbar props={{ setPopup, openPopUp, setLoginPopUp, closePopup, logedIn, setLogedIn, getRandomRecipes, setMemories }} />
                <Cards props={{ memories, setMemories, formData, setFormData, setPopup, setIsEiditing, setEditId, setLoader, getRandomRecipes }} />
                <PopUp props={{ popUp, setPopup, formData, setFormData, closePopup, memories, setMemories, isEiditing, editId, setLoader }} />
            </div>
        </>
    )
}

export default ClusterCompo