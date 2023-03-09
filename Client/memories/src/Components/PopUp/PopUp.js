import React from 'react';
import axios from 'axios';
import './PopUp.css';

function PopUp(popUp) {
    const handleChange = async (e) => {
        var { name, value } = e.target;

        if (name == 'image') {
            const base64 = await convertToBase64(e.target.files[0])
            popUp.props.setFormData({
                ...popUp.props.formData,
                [name]: base64
            });
        }
        else {
            popUp.props.setFormData({
                ...popUp.props.formData,
                [name]: value
            });
        }
    }

    const handleData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/memories', popUp.props.formData).then((res, err) => {
            if (res.data == "Memories Stored") {
                console.log("Memories Stored");
            }
            else {
                console.log(err);
            }
        }).catch((err) => {
            if (err) throw err;
        })
        popUp.props.setMemories([...popUp.props.memories, popUp.props.formData]);
        popUp.props.setPopup(false);
    }

    const resetForm = (e) => {
        const { name, value } = e.target;
        popUp.props.setFormData({
            [name]: ''
        })
    }

    return (
        <>
            <div className={popUp.props.popUp ? 'login-box active' : 'login-box'}>
                <div className='cross' onClick={popUp.props.closePopup}>X</div>
                <form className='PopUp' onSubmit={handleData} onReset={resetForm}>
                    <div className="user-box">
                        <input type="text" value={popUp.props.formData.title} onChange={handleChange} name="title" required />
                        <label>Title</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={popUp.props.formData.subTitle} onChange={handleChange} name="subTitle" required />
                        <label>SubTitle</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={popUp.props.formData.discription} onChange={handleChange} name="message" required />
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

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

export default PopUp