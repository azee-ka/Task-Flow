// Login.js
import React, { useContext } from 'react';
import { AuthContext } from '../AuthenticationContext';

const Login = () => {
    const { login } = useContext(AuthContext);

    const handleLogin = () => {
        // Your login logic here
        login({ username: 'example', password: 'password' });
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
