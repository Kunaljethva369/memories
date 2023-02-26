import React, { useState } from 'react';
import axios from 'axios';
import './PopUp.css';

function PopUp(popUp) {
    const [innerData, setinnerData] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        message: "",
        image: ""
    })

    const handleChange = (e) => {
        var { name, value } = e.target;

        if (name == 'image') {
            setFormData({
                ...formData,
                [name]: value = URL.createObjectURL(e.target.files[0])
            })
        }
        else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
        
    }
    
    const handleData = (e) => {
        e.preventDefault();
        innerData.push(formData);
        axios.post('http://localhost:3001/memories',formData).then((res, err) => {
            if(res.data == "Memories Stored"){
                console.log("Memories Stored");
            }
            else{
                console.log(err);
            }
        }).catch((err) => {
            if (err) throw err;
        })
        popUp.props.setMemories(innerData);
        popUp.props.setPopup(false);
    }

    const resetForm = (e) => {
        const { name, value } = e.target;
        setFormData({
            [name]: ''
        })
    }

    return (
        <>
            <div className={popUp.props.popUp ? 'login-box active' : 'login-box'}>
                <div className='cross' onClick={popUp.props.closePopup}>X</div>
                <form className='PopUp' onSubmit={handleData} onReset={resetForm}>
                    <div className="user-box">
                        <input type="text" value={formData.title} onChange={handleChange} name="title" required />
                        <label>Title</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={formData.subTitle} onChange={handleChange} name="subTitle" required />
                        <label>SubTitle</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={formData.discription} onChange={handleChange} name="message" required />
                        <label>Message</label>
                    </div>
                    <input className='chooseFile' type="file" onChange={handleChange} name="image" required />
                    <div className='d-flex justify-content-between'>
                        <button type='submit'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </button>
                        <button type='reset'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default PopUp