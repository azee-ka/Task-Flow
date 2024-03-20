// Login.js
import React, { useContext, useState } from 'react';
import { useAuth } from '../AuthenticationContext';
import './Login.css';

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        // Perform login logic
        await login(email, password);
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        className='login-form-input'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='login-form-input'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='login-form-button' type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
