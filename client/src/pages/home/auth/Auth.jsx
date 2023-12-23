import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Auth.css'
import icon from '../../../assets/icon.png'
import AboutAuth from './AboutAuth';
import { signup, login } from '../../../action/Auth';
const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsSignup(!isSignup);
        setName("");
        setEmail("");
        setPassword("");
    }

    const getOS = () => {
        const platform = window.navigator.platform;
        const macPlatform = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
        return macPlatform.includes(platform) ? 'MacOs' : 'Windows';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //  console.log(name, email, password)
        if (!email && !password) {
            alert("Enter email and password");
        }
        if (isSignup) {
            if (!name) {
                alert("Enter a name to continue");
            }
            dispatch(signup({ name, email, password }, navigate));
        } else {
            dispatch(login({
                email,
                password,
                browser: navigator.userAgent,
                OS: getOS,
                deviceType: window.screen.width > 768 ? 'Desktop' : 'Mobile'
            }, navigate));
        }
    };
    return (
        <section className='auth-section'>
            {isSignup && <AboutAuth />}
            <div className='auth-container-2'>
                {!isSignup && <img src={icon} alt='stack overflow' className='login-logo' />}
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <label htmlFor="name">
                            <h4>Display Name</h4>
                            <input type="text" id="name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                        </label>
                    )}
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type='email' name='email' id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </label>
                    <label htmlFor="password">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h4>Password</h4>
                            {!isSignup && (
                                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                                    {/* forgot password? */}
                                </p>
                            )}
                        </div>
                        <input type='password' name='password' id='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        {isSignup && <p style={{ color: '#666767', fontSize: '13px' }}>Password must contain at least eight character ,inlcuding at least 1 letter and 1 number</p>}
                    </label>
                    {isSignup && (
                        <label>
                            <input type='checkbox' id='check' />
                            <p style={{ fontSize: '13px' }}>Otp-in recive occasional <br /> product updates, user research invitations, <br /> company announcements, and digsts.</p>
                        </label>
                    )}
                    <button type='submit' className='auth-btn'>{isSignup ? "Sing up" : "Log in"}</button>
                    {
                        isSignup && (
                            <p style={{ color: '#666767', fontSize: '13px' }}>
                                By clicking "Sign up",you agreeto our
                                <span style={{ color: '#007ac6' }}>terms of <br /> service</span>,
                                <span style={{ color: '#007ac6' }}>privecy policy</span> and
                                <span style={{ color: '#007ac6' }}>cooking policy</span>
                            </p>
                        )
                    }
                </form>
                <p>
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <button
                        type="button"
                        className="handle-switch-btn"
                        onClick={handleSwitch}
                    >
                        {isSignup ? "Log in" : "sign up"}
                    </button>
                </p>
            </div>
        </section>
    );
}

export default Auth;
