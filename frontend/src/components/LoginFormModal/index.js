import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    const handleDemoSubmit = (e) => {
       // e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential:"Demo-lition", password:'password' }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };




    return (
        <div className="loginsonmodal">
            <div><h1>Log In</h1></div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li style={{color:'red'}} key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                   
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                        placeholder="Username or Email"
                    />
                </label>
                <label>
                    
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </label>
                <button className="forSubmit" type="submit" disabled={(password.length < 6 || credential.length < 4) ? true:false}>Log In</button>
            </form>
            <div>
            <button className="demoSubmit"  onClick={()=> handleDemoSubmit()}>Demo User</button>
            </div>
        </div>
    );
}

export default LoginFormModal;