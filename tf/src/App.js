import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/Authentication/AuthenticationContext';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';

import Dashboard from './components/Dashboard/Dashboard';
import TaskList from './components/TaskList/TaskList';
import Profile from './components/Profile/Profile';

const privateRoutes = [
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/tasks', element: <TaskList /> },
    { path: '/profile', element: <Profile /> },

    // Add more private routes as needed
];

const publicRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    // Add more public routes as needed
];

const PrivateRoute = ({ element, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

const PublicRoute = ({ element, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);
    return !isLoggedIn ? <Route {...rest} element={element} /> : <Navigate to="/dashboard" />;
};

const App = () => {
    return (
      <div className='App'>
        <Router>
            <Routes>
                <Route element={<NavigationBar />}>
                    {publicRoutes.map((route, index) => (
                        <Route key={index} {...route} element={<PublicRoute {...route} />} />
                    ))}
                    {privateRoutes.map((route, index) => (
                        <Route key={index} {...route} element={<PrivateRoute {...route} />} />
                    ))}
                </Route>
                <Route path="/*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;
