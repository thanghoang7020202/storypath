import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function ProjectForm({ isNewProject, onSubmit }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const existingProject = isNewProject ? null : projectsData.find(project => project.id == id);

    // State to manage the current project being added or edited
    const [currentProject, setCurrentProject] = useState({
        id: existingProject ? existingProject.id : null,
        title: existingProject ? existingProject.title : '',
        is_published: existingProject ? existingProject.is_published : 'Published',
        participant_scoring: existingProject ? existingProject.participant_scoring : 'Number of Scanned QR Codes',
        username: 's4759487',
        instructions: existingProject ? existingProject.instructions : '',
        initial_clue: existingProject ? existingProject.initial_clue : '',
        homescreen_display: existingProject ? existingProject.homescreen_display : 'Display initial clue',
    });

    // Handle input change for form fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentProject({ ...currentProject, [name]: value });
    };

    // Handle form submission to add or update project
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        await onSubmit(currentProject); // Call the correct handler passed as prop (add or update)
        navigate('/projects'); // Redirect to the projects list after submission
    };

    return (
        <div className="container">
            <h2>{currentProject.id ? 'Edit Project' : 'Add Project'}</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={currentProject.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={currentProject.description || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Instructions</label>
                    <textarea
                        name="instructions"
                        className="form-control"
                        value={currentProject.instructions}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Initial Clue</label>
                    <textarea
                        name="initial_clue"
                        className="form-control"
                        value={currentProject.initial_clue}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Homescreen Display</label>
                    <select
                        name="homescreen_display"
                        className="form-control"
                        value={currentProject.homescreen_display}
                        onChange={handleInputChange}
                    >
                        <option value="Display initial clue">Display initial clue</option>
                        <option value="Display nothing">Display nothing</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Participant Scoring</label>
                    <select
                        name="participant_scoring"
                        className="form-control"
                        value={currentProject.participant_scoring}
                        onChange={handleInputChange}
                    >
                        <option value="Number of Scanned QR Codes">Number of Scanned QR Codes</option>
                        <option value="Time Taken to Complete">Time Taken to Complete</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Status</label>
                    <select
                        name="is_published"
                        className="form-control"
                        value={currentProject.is_published}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Published">Published</option>
                        <option value="In Progress">In Progress</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    {currentProject.id ? 'Save Changes' : 'Add Project'}
                </button>
                <Link to="/projects" className="btn btn-secondary ms-2">Cancel</Link>
            </form>
        </div>
    );
}

export default ProjectForm;
