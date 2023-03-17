import React, { useRef } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import './PopUp.css';

function PopUp(popUp) {

    const fileInputRef = useRef(null);

    const handleChange = async (e) => {
        var { name, value } = e.target;

        if (name == 'image') {
            const base64 = await convertToBase64(e.target.files[0])
            popUp.props.setFormData({
                ...popUp.props.formData,
                [name]: base64,
            });
        }
        else {
            popUp.props.setFormData({
                ...popUp.props.formData,
                [name]: value,
            });
        }
    }

    const handleData = (e) => {
        e.preventDefault();
        popUp.props.formData.id = uuid();
        if (popUp.props.isEiditing) {
            const editMemories = popUp.props.memories.filter((el) => {
                return el.id == popUp.props.editId;
            });
        }
        else {
            popUp.props.setLoader(true);
            // axios.post('https://react-curd.onrender.com/recipe/addrecpie', popUp.props.formData).then((res, err) => {
            axios.post('http://localhost:3001/recipe/addrecpie', popUp.props.formData).then((res, err) => {
                if (res.data.message == "Recipe is Stored") {
                    console.log("Memories Stored");
                    popUp.props.setMemories([...popUp.props.memories, popUp.props.formData]);
                    popUp.props.setLoader(false);
                }
                else {
                    console.log(err);
                }
        }).
        catch ((err) => {
            if (err) throw err;
        });
        popUp.props.setPopup(false);
        popUp.props.setFormData({
            title: "",
            subTitle: "",
            message: "",
            image: fileInputRef.current.value = '',
        });
    }
}


return (
    <>
        <div className={popUp.props.popUp ? 'loginregister active logreg' : 'loginregister'}>
            <div class="section">
                <div class="container">
                    <div class="row full-height justify-content-center">
                        <div class="col-12 text-center align-self-center py-5">
                            <div class="section pb-5 pt-5 pt-sm-2 text-center">
                                <div className='cross' onClick={popUp.props.closePopup}>X</div>
                                <form className='PopUp' onSubmit={handleData}>
                                    <div class="card-3d-wrap mx-auto">
                                        <div class="card-3d-wrapper">
                                            <div class="card-front">
                                                <div class="center-wrap">
                                                    <h6 class="mb-0 pb-3 heading"><span>ADD RECIPES</span></h6>
                                                    <div class="section text-center">
                                                        <div class="form-group">
                                                            <div className='formsKunal'>
                                                                <input type="text" className='form-style' value={popUp.props.formData.title} placeholder="Enter Title" onChange={handleChange} name="title" required />
                                                            </div>
                                                        </div>
                                                        <div class="form-group mt-2">
                                                            <div className='formsKunal'>
                                                                <input type="text" className='form-style' value={popUp.props.formData.subTitle} placeholder="Enter SubTitle" onChange={handleChange} name="subTitle" required />
                                                            </div>
                                                        </div>
                                                        <div class="form-group mt-2">
                                                            <div className='formsKunal'>
                                                                <input type="text" className='form-style' value={popUp.props.formData.message} placeholder="Enter Discerption" onChange={handleChange} name="message" required />
                                                            </div>
                                                        </div>
                                                        <div class="form-group mt-2">
                                                            <div className='formsKunal'>
                                                                <input className='chooseFile' type="file" ref={fileInputRef} onChange={handleChange} name="image" />
                                                            </div>
                                                        </div>
                                                        <button className='btn mt-4' value="submit">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <SignIn /> */}
                                        </div>
                                        {/* <div className="user-box">
                        <input type="text" value={popUp.props.formData.title} onChange={handleChange} name="title" required />
                        <label>Title</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={popUp.props.formData.subTitle} onChange={handleChange} name="subTitle" required />
                        <label>SubTitle</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={popUp.props.formData.message} onChange={handleChange} name="message" required />
                        <label>Message</label>
                    </div>
                    <input className='chooseFile' type="file" onChange={handleChange} name="image" />
                    <div className='d-flex justify-content-between'>
                        <button type='submit'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </button> */}
                                        {/* <button type='reset'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Clear
                        </button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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