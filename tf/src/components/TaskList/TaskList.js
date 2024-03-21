import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList, faSort } from '@fortawesome/free-solid-svg-icons';
import API_BASE_URL from '../Authentication/utils/apiConfig';
import GetConfig from '../Authentication/utils/config';
import { useAuthState } from '../Authentication/utils/AuthProvider';
import TaskForm from '../TaskForm/TaskForm';
import App from '../../App';
import { formatDate, timeAgo } from '../../utils/formatDate';

const TaskList = () => {
    const { token } = useAuthState();
    const config = GetConfig(token);
    const [isGridView, setIsGridView] = useState(true);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [sortOption, setSortOption] = useState('created_at'); // Default sort by created_at
    const [tasks, setTasks] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/get-tasks/?sort_by=${sortOption}`, config);
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []); // Refetch tasks when sort option changes

    useEffect(() => {
        // Fetch user's preferred view from the backend
        const fetchPreferredView = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/get-is-grid-view/`, config);
                setIsGridView(response.data.is_grid_view);
            } catch (error) {
                console.error('Failed to fetch preferred view', error);
            }
        };

        fetchPreferredView();
    }, []);

    const handleCreateTaskSubmit = async (title, description, completed, started) => {
        try {
            const newTaskData = {
                title: title,
                description: description,
                completed: completed,
                started: started,
            };
            await axios.post(`${API_BASE_URL}/api/create-task/`, newTaskData, config);
            fetchTasks(); // Refetch tasks after creating a new task
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    const handleCreateTask = async () => {
        setShowTaskForm(true);
    };

    const handleCloseTaskForm = () => {
        setShowTaskForm(false);
    };

    const updatePreferredView = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/update-view-mode/?is_grid_view=${!isGridView}`, null, config);
        } catch (error) {
            console.error('Failed to update preferred view', error);
        }
    };
    

    const toggleView = () => {
        setIsGridView((prev) => !prev);
        updatePreferredView();
    };

    useEffect(() => {
        fetchTasks();
    }, [sortOption]); // Refetch tasks when sort option changes

    const handleSortOptionChange = async (option) => {
        setSortOption(option); // Update the local state
        try {
            await axios.post(`${API_BASE_URL}/api/update-sort-option/`, { sort_option: option }, config);
            fetchTasks(); // Refetch tasks after updating sort option
        } catch (error) {
            console.error('Failed to update sort option', error);
        }
    };

    console.log(tasks);
    return (
        <div className="dashboard-container" onClick={() => setShowDropdown(false)} >
            <div className='dashboard-container-header'>
                <FontAwesomeIcon
                    icon={isGridView ? faList : faTh}
                    onClick={toggleView}
                    className="view-toggle-icon"
                />
                <div className="sort-dropdown-container">
                    <FontAwesomeIcon className="view-toggle-icon" icon={faSort} onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }} />
                    {showDropdown && (
                        <div className="dropdown-content">
                            <div onClick={() => handleSortOptionChange('title')}>Sort by Title</div>
                            <div onClick={() => handleSortOptionChange('description')}>Sort by Description</div>
                            <div onClick={() => handleSortOptionChange('started')}>Sort by Started</div>
                            <div onClick={() => handleSortOptionChange('completed')}>Sort by Completed</div>
                            <div onClick={() => handleSortOptionChange('created_at')}>Sort by Created At</div>
                            <div onClick={() => handleSortOptionChange('updated_at')}>Sort by Updated At</div>
                        </div>
                    )}
                </div>
            </div>
            <div className={`dashboard-content${isGridView ? '' : '-list'}`}>
                <div className="dashboard-header">
                    <h1>Tasks</h1>
                    <button onClick={handleCreateTask}>Create Task</button>
                </div>
                {tasks.map(task => (
                    <div key={task.id} className={isGridView ? `task-card` : 'task-list'}>
                        <p className='task-updated-at'>Last Updated {formatDate(task.created_at)}<br/>{timeAgo(task.created_at)}</p>
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-description">{task.description.length <= 25 ? task.description : task.description.substr(0, 25) + '...'}</p>
                        <p className="task-status">{task.started ? task.completed ? 'Completed' : 'Pending' : 'Not Started'}</p>
                        <p className='task-created-at'>Created {formatDate(task.created_at)}<br/>{timeAgo(task.updated_at)}</p>
                    </div>
                ))}
            </div>
            {showTaskForm && <TaskForm onClose={handleCloseTaskForm} handleCreateTaskSubmit={handleCreateTaskSubmit} />}
        </div>
    );
};

export default TaskList;
