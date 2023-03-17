import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import './SignIn.css';

function SignIn(sign) {

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    });


    const handleRegisterData = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
    }


    const handleSubmit = () => {
        sign.props.props.setLoader(true);
        axios.post('http://localhost:3001/recipe/registerUser', registerData).then((res) => {
            if (res.data.message == "User registered successfully") {
                sign.props.props.setLoginPopUp(false);
                setRegisterData({
                    name: "",
                    email: "",
                    password: "",
                });
                sign.props.props.setLogedIn(true);
                localStorage.setItem('token', JSON.stringify({ "tokens": uuid(), "emailid": registerData.email }));
                sign.props.props.setLoader(false);
            }
            else if (res.data.message == "User already exists") {
                alert("EmailId Exists, please enter other email id");
            }
        }).catch((err) => {
            console.log(err);
        });
    }


    return (
        <>
            <div class="card-back">
                <div class="center-wrap">
                    <div class="section text-center">
                        <h4 class="mb-4 pb-3">Signup</h4>
                        <div class="form-group">
                            <div className='formsKunal'>
                                <div><i class="fa fa-user fs-4" aria-hidden="true"></i></div>
                                <input type="text" className='form-style' value={registerData.name} name='name' onChange={handleRegisterData} placeholder="Enter Your Name" autoComplete='off' required />
                                <i class="input-icon uil uil-user"></i>
                            </div>
                        </div>
                        <div class="form-group mt-2">
                            <div className='formsKunal'>
                                <div><i class="fa fa-envelope" aria-hidden="true"></i></div>
                                <input type="email" className='form-style' value={registerData.email} name='email' onChange={handleRegisterData} placeholder="Enter Your Email" autoComplete='off' required />
                                <i class="input-icon uil uil-at"></i>
                            </div>
                        </div>
                        <div class="form-group mt-2">
                            <div className='formsKunal'>
                                <div><i class="fa fa-unlock-alt fs-4" aria-hidden="true"></i></div>
                                <input type="password" className='form-style' value={registerData.password} name='password' onChange={handleRegisterData} placeholder="Enter Password" autoComplete='off' required />
                                <i class="input-icon uil uil-lock-alt"></i>
                            </div>
                        </div>
                        {/* {
                            showOTP ?
                                <>
                                    <div class="form-group mt-2">
                                        <div className='formsKunal'>
                                            <div><i class="fa fa-key fs-4" aria-hidden="true"></i></div>
                                            <input type="text" className='form-style' name='OTP' maxLength={6} placeholder="Please Enter OTP" required />
                                            <i class="input-icon uil uil-lock-alt"></i>
                                        </div>
                                    </div>
                                </> : ''
                        } */}
                        <button className='btn mt-4' onClick={handleSubmit} value="submit">Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn;