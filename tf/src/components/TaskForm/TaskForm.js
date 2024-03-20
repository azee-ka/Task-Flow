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
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className="task-form-header">
                    <h2>Create New Task</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='task-form-title-field'>
                        <textarea
                            id='titleTextarea'
                            placeholder='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor='titleTextarea'>Title</label>
                    </div>
                    <div className='task-form-description-field'>
                        <textarea
                            id='descriptionTextarea'
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                        <label htmlFor='descriptionTextarea'>Description</label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
