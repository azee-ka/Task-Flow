import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './components/Authentication/AuthenticationContext';
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
];

const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];

const App = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className={`App ${isLoggedIn ? 'private' : ''}`}>
      <Router>
        <NavigationBar />
        <Routes>
          {isLoggedIn ? (
            privateRoutes.map((route, index) => (
              <Route key={index} {...route} />
            ))
          ) : (
            publicRoutes.map((route, index) => (
              <Route key={index} {...route} />
            ))
          )}
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};




export default App;