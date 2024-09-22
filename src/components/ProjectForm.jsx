import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { addProject, updateProject, getProject } from '../api';

function ProjectForm({ isNewProject }) {
    const navigate = useNavigate();
    const { id } = useParams();
    let existingProject = null;
    let firstRender = true;

    // State to manage the current project being added or edited
    const [currentProject, setCurrentProject] = useState({
        id: existingProject ? existingProject.id : null,
        title: existingProject ? existingProject.title : '',
        is_published: existingProject ? existingProject.is_published : false,
        participant_scoring: existingProject ? existingProject.participant_scoring : 'Number of Scanned QR Codes',
        username: 's4759487',
        instructions: existingProject ? existingProject.instructions : '',
        initial_clue: existingProject ? existingProject.initial_clue : '',
        homescreen_display: existingProject ? existingProject.homescreen_display : 'Display initial clue'
    });

    // State to store the initial form data for comparison
    // if isNewProject is false, call GET /projects/:id to get the project details
    const [initialProject, setInitialProject] = useState(currentProject);

    const fetchProject = async () => {
        try {
            const data = await getProject(id);
            existingProject = data[0];
            setCurrentProject({
                id: existingProject.id,
                title: existingProject.title,
                description: existingProject.description,
                is_published: existingProject.is_published,
                participant_scoring: existingProject.participant_scoring,
                instructions: existingProject.instructions,
                initial_clue: existingProject.initial_clue,
                homescreen_display: existingProject.homescreen_display
            });
            setInitialProject({currentProject});
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    // if isNewProject is false, call GET /projects/:id to get the project details
    if (!isNewProject) {
        useEffect(() => {
            fetchProject();
            isNewProject = false; // Set isNewProject to false after fetching the project
        }, [id]);
    }

    // Handle input change for form fields
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCurrentProject({ ...currentProject, [name]: type === 'checkbox' ? checked : value });
    };

    // Handle form submission to add or update project
    const handleFormSubmit = async (event) => {
        event.preventDefault(); 
        if (isNewProject) {
            // remove id from currentProject
            delete currentProject.id; // Remove the ID before adding a new project
            // add project and get the response
            await addProject(currentProject);
            alert('Project added successfully!');
        } else {
            delete currentProject.id; // Prevent updating the primary key
            await updateProject(id, currentProject);
            alert('Project updated successfully!');
        }
        setInitialProject(currentProject);
        //navigate('/projects'); // Redirect to the projects list after submission
    };

    // Compare currentProject with initialProject to check if the form has unsaved changes
    const hasUnsavedChanges = () => {
        return JSON.stringify(currentProject) !== JSON.stringify(initialProject);
    };
    // Handle the Cancel button with confirmation if there are unsaved changes
    const handleCancelClick = (event) => {
        if (hasUnsavedChanges()) {
            const confirmLeave = window.confirm(
                'You have unsaved changes. Are you sure you want to leave without saving?'
            );
            if (!confirmLeave) {
                event.preventDefault();
            }
        }
    };

    return (
        <div className="container">
            <h2>{currentProject.id ? 'Edit Project of id: ' + currentProject.id : 'Add Project'}</h2>
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
                    />
                </div>

                <div className="mb-3">
                    <label>Instructions</label>
                    <textarea
                        name="instructions"
                        className="form-control"
                        value={currentProject.instructions}
                        onChange={handleInputChange}
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
                        <option value="Display all locations">Display all locations</option>
                        <option value="Show map">Show map</option>
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
                        <option value="Number of Locations Entered">Number of Locations Entered</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Published</label>
                    <input
                        type = "checkbox"
                        name="is_published"
                        className="form-check-input"
                        checked={currentProject.is_published}
                        onChange={handleInputChange}
                        />
                </div>

                <button type="submit" className="btn btn-primary">
                    {currentProject.id ? 'Save Changes' : 'Add Project'}
                </button>
                <Link to="/projects" className="btn btn-secondary ms-2"  onClick={handleCancelClick} >Cancel</Link>
            </form>
        </div>
    );
}

export default ProjectForm;
