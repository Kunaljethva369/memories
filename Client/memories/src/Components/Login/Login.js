import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import SignIn from '../SignIn/SingIn';
import './Login.css';


function Login(login) {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    const handleData = (e) => {
        login.props.setLoader(true);
        e.preventDefault();
        // axios.post('http://localhost:3001/recipe/loginUser', loginData).then((res) => {
        axios.post('https://react-curd.onrender.com/recipe/loginUser', loginData).then((res) => {
            if (res.data.message == 'Login Success') {
                login.props.setLoginPopUp(false);
                setLoginData({
                    email: "",
                    password: "",
                });
                login.props.setLogedIn(true);
                localStorage.setItem('token', JSON.stringify({ "tokens": uuid(), "emailid": loginData.email }));
                // login.props.setLoader(false);
                const tokens = localStorage.getItem('token');
                if (tokens) {
                    const LoginedToken = JSON.parse(tokens).emailid;
                    const formToken = {
                        email: LoginedToken
                    }
                    axios.get('https://react-curd.onrender.com/recipe/getrecipes', formToken).then(async (res) => {
                        // axios.post('http://localhost:3001/recipe/getrecipes', formToken).then(async (res) => {
                        const data = await res.data;
                        login.props.setMemories(data);
                        login.props.setLoader(false);
                    }).catch((err) => {
                        console.log(err);
                    });
                }
                else {
                    console.log("LOGIN");
                    login.props.setLoader(false);
                }
                // }
                // getData();
                const token = localStorage.getItem('token');
                if (token) {
                    login.props.setLogedIn(true);
                }
                else {
                    login.props.setLogedIn(false);
                }
            }
            else {
                alert("Invalid Email or Password");
            }

        }).catch((err) => { console.log(err) });
    }

    return (
        <>
            <div className={login.props.loginPopUp ? 'loginregister active logreg' : 'loginregister'} id='logreg'>
                <div class="section">
                    <div class="container">
                        <div class="row full-height justify-content-center">
                            <div class="col-12 text-center align-self-center py-5">
                                <div class="section pb-5 pt-5 pt-sm-2 text-center">
                                    <div className='cross' onClick={() => { login.props.setLoginPopUp(false) }}>X</div>
                                    <h6 class="mb-0 pb-3"><span>Login </span><span>SignUp</span></h6>
                                    <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                    <label for="reg-log"></label>
                                    <div class="card-3d-wrap mx-auto">
                                        <div class="card-3d-wrapper">
                                            <div class="card-front">
                                                <div class="center-wrap">
                                                    <div class="section text-center">
                                                        <h4 class="mb-4 pb-3">Login</h4>
                                                        <div class="form-group">
                                                            <div className='formsKunal'>
                                                                <div><i class="fa fa-envelope fs-5" aria-hidden="true"></i></div>
                                                                <input type="email" className='form-style' value={loginData.email} onChange={handleChange} name='email' placeholder="Enter Registerd Email" autoComplete='off' required />
                                                                <i class="input-icon uil uil-at"></i>
                                                            </div>
                                                        </div>
                                                        <div class="form-group mt-2">
                                                            <div className='formsKunal'>
                                                                <div><i class="fa fa-unlock-alt fs-4" aria-hidden="true"></i></div>
                                                                <input type="password" className='form-style' value={loginData.password} onChange={handleChange} name='password' placeholder="Enter Your Password" autoComplete='off' autoCorrect='off' required />
                                                                <i class="input-icon uil uil-lock-alt"></i>
                                                            </div>
                                                        </div>
                                                        <button className='btn mt-4' onClick={handleData} value="submit">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <SignIn props={login} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;