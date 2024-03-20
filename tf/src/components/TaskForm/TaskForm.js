import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './TaskForm.css';

const TaskForm = ({ onClose, handleCreateTaskSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [started, setStarted] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        // You can add axios call to submit the form data
        handleCreateTaskSubmit(title, description, completed, started);
        onClose(); // Close the form after submission
    };

    return (
        <div className="task-form-overlay" onClick={onClose}>
            <div className="task-form" onClick={(e) => e.stopPropagation()}>
                <div className="task-form-header">
                    <h2>Create New Task</h2>
                </div>
                <button className="close-button" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
