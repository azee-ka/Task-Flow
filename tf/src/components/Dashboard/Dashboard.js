import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import API_BASE_URL from '../Authentication/utils/apiConfig';
import config from '../Authentication/utils/config';
import GetConfig from '../Authentication/utils/config';
import { useAuthState } from '../Authentication/utils/AuthProvider';
import TaskForm from '../TaskForm/TaskForm';

const Dashboard = () => {
    const { token } = useAuthState();
    const [tasks, setTasks] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);

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

    const handleCreateTaskSubmit = async (title, description, completed, started) => {
        try {
            const newTaskData = {
                title: title,
                description: description,
                completed: completed,
                started: started,
            };

            const config = GetConfig(token);
            await axios.post(`${API_BASE_URL}/api/create-task/`, newTaskData, config);
            // Refresh the tasks list after creating a new task
            fetchTasks();
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    const handleCreateTask = async () => {
        setShowTaskForm(true); // Show the task form overlay
    };

    const handleCloseTaskForm = () => {
        setShowTaskForm(false); // Close the task form overlay
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
                        <p className="task-status">{task.completed ? task.completed ? 'Completed' : 'Pending' : 'Not Started'}</p>
                    </div>
                ))}
            </div>
            {showTaskForm && <TaskForm onClose={handleCloseTaskForm} handleCreateTaskSubmit={handleCreateTaskSubmit}/>} {/* Render the task form overlay */}
        </div>
    );
};

export default Dashboard;
