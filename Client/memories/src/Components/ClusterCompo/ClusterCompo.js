import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Cards from '../Cards/Cards';
import Navbar from '../Navbar/Navbar';
import PopUp from '../PopUp/PopUp';
import Login from '../Login/Login';
import DeletePop from '../DeletePop/DeletePop';

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
    const [deletePop, setDeletePop] = useState(false);
    const [deletedElement, setDeletedElement] = useState({});

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
        if (isEiditing) {
            setIsEiditing(false);
        }
    }

    const getRandomRecipes = () => {
        axios.get("https://react-curd.onrender.com/recipe/randonrecipes").then((res) => {
            setMemories(res.data);
            setLoader(true);
        }).catch((err) => {
            console.log(err);
        });
    }


    useEffect(() => {
        const getData = () => {
            // setLoader(true);
            const tokens = localStorage.getItem('token');
            if (tokens) {
                const LoginedToken = JSON.parse(tokens).emailid;
                const formToken = {
                    email: LoginedToken
                }
                axios.post('https://react-curd.onrender.com/recipe/getRecipes', formToken).then(async (res) => {
                    // axios.post('http://localhost:3001/recipe/getRecipes', formToken).then(async (res) => {
                    const data = await res.data;
                    setMemories(data);
                    setLoader(true);
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                axios.get("https://react-curd.onrender.com/recipe/randonrecipes").then((res) => {
                    // axios.get("http://localhost:3001/recipe/randonrecipes").then((res) => {
                    setMemories(res.data.recipes);
                    setLoader(true);
                }).catch((err) => {
                    console.log(err);
                });
            }
            // console.log("LOGIN");
            // setLoader(false);
        }
        getData();
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
                <Navbar props={{ setPopup, openPopUp, setLoginPopUp, closePopup, logedIn, setLogedIn, getRandomRecipes, setMemories, setLoader }} />
                <Cards props={{ memories, formData, setFormData, setPopup, setIsEiditing, setEditId, getRandomRecipes, setDeletePop, setDeletedElement }} />
                <PopUp props={{ popUp, setPopup, formData, setFormData, closePopup, memories, setMemories, isEiditing, editId, setLoader, setIsEiditing }} />
                <DeletePop props={{ deletePop, setDeletePop, deletedElement, memories, setLoader, setMemories }} />
            </div>
        </>
    )
}

export default ClusterCompo