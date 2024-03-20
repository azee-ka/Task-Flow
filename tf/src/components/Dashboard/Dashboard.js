import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import API_BASE_URL from '../Authentication/utils/apiConfig';
import config from '../Authentication/utils/config';
import GetConfig from '../Authentication/utils/config';
import { useAuthState } from '../Authentication/utils/AuthProvider';

const Dashboard = () => {
    const { token } = useAuthState();
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const config = GetConfig(token);
            const response = await axios.get(`${API_BASE_URL}/api/get-tasks/`, config);
            console.log(response.data);
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async () => {
        try {
            const newTaskData = {
                title: 'New Task',
                description: 'Description of the new task',
                completed: false
            };

            const config = GetConfig(token);
            await axios.post(`${API_BASE_URL}/api/create-task/`, newTaskData, config);
            // Refresh the tasks list after creating a new task
            fetchTasks();
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Tasks</h1>
                    <button onClick={handleCreateTask}>Create Task</button>
                </div>
                {tasks.map(task => (
                    <div key={task.id} className="task-card">
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-description">{task.description}</p>
                        <p className="task-status">{task.completed ? 'Completed' : 'Pending'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
