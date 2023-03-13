import React from 'react';
import './SignIn.css';

function SignIn() {
    return (
        <>
            <div class="card-back">
                <div class="center-wrap">
                    <div class="section text-center">
                        <h4 class="mb-4 pb-3">Signup</h4>
                        <div class="form-group">
                            <div className='formsKunal'>
                                <div><i class="fa fa-user fs-4" aria-hidden="true"></i></div>
                                <input type="text" className='form-style' name='Name' placeholder="Enter Your Name" autoComplete='off' required />
                                <i class="input-icon uil uil-user"></i>
                            </div>
                        </div>
                        <div class="form-group mt-2">
                            <div className='formsKunal'>
                                <div><i class="fa fa-envelope" aria-hidden="true"></i></div>
                                <input type="email" className='form-style' name='Email' placeholder="Enter Your Email" autoComplete='off' required />
                                <i class="input-icon uil uil-at"></i>
                            </div>
                        </div>
                        <div class="form-group mt-2">
                            <div className='formsKunal'>
                                <div><i class="fa fa-unlock-alt fs-4" aria-hidden="true"></i></div>
                                <input type="password" className='form-style' name='Password' placeholder="Enter Password" autoComplete='off' required />
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
                        <button className='btn mt-4' value="submit">Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn;