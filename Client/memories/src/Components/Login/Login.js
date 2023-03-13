import React from 'react';
import SignIn from '../SignIn/SingIn';
import './Login.css';


function Login(login) {
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
                                                                <input type="email" className='form-style' name='Email' placeholder="Enter Registerd Email" autoComplete='off' required />
                                                                <i class="input-icon uil uil-at"></i>
                                                            </div>
                                                        </div>
                                                        <div class="form-group mt-2">
                                                            <div className='formsKunal'>
                                                                <div><i class="fa fa-unlock-alt fs-4" aria-hidden="true"></i></div>
                                                                <input type="password" className='form-style' autoComplete='off' name='Password' placeholder="Enter Your Password" autoCorrect='off' required />
                                                                <i class="input-icon uil uil-lock-alt"></i>
                                                            </div>
                                                        </div>
                                                        <button className='btn mt-4' value="submit">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <SignIn />
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