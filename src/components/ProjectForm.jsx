import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { addProject, updateProject, getProject } from '../api';

/**
 * ProjectForm component to add or edit a project.
 * @param {Object} props - The props object (contains isNewProject flag)
 * @returns JSX element
 */
function ProjectForm({ isNewProject }) {
    const navigate = useNavigate();                                             // Hook to navigate to a different URL
    const { id } = useParams();                                                 // Get the project ID from the URL
    let existingProject = null;                                                 // Variable to store the existing project
    let firstRender = true;                                                     // Variable to track the first render
    const [isSubmitting, setIsSubmitting] = useState(false);                    // State to manage form submission
    const [hoveredField, setHoveredField] = useState('');                       // State to track hovered field
    const [errorFields, setErrorFields] = useState([]);                         // State to track required fields that are empty

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

    /**
     * Fetch the project details when the component mounts.
     */
    const fetchProject = async () => {
        try {
            const data = await getProject(id);
            existingProject = data[0];

            // used temp to avoid async issues
            let temp = {
                id: existingProject.id,
                title: existingProject.title,
                description: existingProject.description,
                is_published: existingProject.is_published,
                participant_scoring: existingProject.participant_scoring,
                instructions: existingProject.instructions,
                initial_clue: existingProject.initial_clue,
                homescreen_display: existingProject.homescreen_display
            }
            setCurrentProject(temp);
            setInitialProject(temp);
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

        const errors = [];
        if (!currentProject.title) errors.push('title');
        // Add any additional required field checks here
        setErrorFields(errors);
        if (errors.length > 0) {
            return; // Prevent submission if there are errors
        }

        // create a copy of currentProject and remove id
        let newProject = { ...currentProject };
        // remove id from newProject
        delete newProject.id;
        if (isNewProject) {
            // add project and get the response
            await addProject(newProject);
            alert('Project added successfully!');
        } else {
            await updateProject(id, newProject);
            alert('Project updated successfully!');
        }
        setInitialProject(currentProject);
        setIsSubmitting(true); // Set isSubmitting to true after form submission
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

                {/* Input fields for project title */}
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className={`form-control ${errorFields.includes('title') ? 'is-invalid' : ''}`}
                        value={currentProject.title}
                        onChange={handleInputChange}
                        onMouseEnter={() => setHoveredField('title')}
                        onMouseLeave={() => setHoveredField('')}
                        required
                    />
                    {hoveredField === 'title' && (
                        <small className="form-text text-muted">Please enter the project title.</small>
                    )}
                </div>

                {/* Input fields for project description */}
                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={currentProject.description || ''}
                        onChange={handleInputChange}
                        onMouseEnter={() => setHoveredField('description')}
                        onMouseLeave={() => setHoveredField('')}
                    />
                    {hoveredField === 'description' && (
                        <small className="form-text text-muted">Provide a brief description of the project.</small>
                    )}
                </div>

                {/* Input fields for project instructions */}
                <div className="mb-3">
                    <label>Instructions</label>
                    <textarea
                        name="instructions"
                        className="form-control"
                        value={currentProject.instructions}
                        onChange={handleInputChange}
                        onMouseEnter={() => setHoveredField('instructions')}
                        onMouseLeave={() => setHoveredField('')}
                    />
                    {hoveredField === 'instructions' && (
                        <small className="form-text text-muted">Instructions for the participants.</small>
                    )}
                </div>

                {/* Input fields for project initial clue */}
                <div className="mb-3">
                    <label>Initial Clue</label>
                    <textarea
                        name="initial_clue"
                        className="form-control"
                        value={currentProject.initial_clue}
                        onChange={handleInputChange}
                        onMouseEnter={() => setHoveredField('initial_clue')}
                        onMouseLeave={() => setHoveredField('')}
                    />
                    {hoveredField === 'initial_clue' && (
                        <small className="form-text text-muted">The initial clue for the project.</small>
                    )}
                </div>

                {/* Dropdown for homescreen display */}
                <div className="mb-3">
                    <label>Homescreen Display</label>
                    <select
                        name="homescreen_display"
                        className="form-control"
                        value={currentProject.homescreen_display}
                        onChange={handleInputChange}
                        onMouseEnter={() => setHoveredField('homescreen_display')}
                        onMouseLeave={() => setHoveredField('')}
                    >
                        <option value="Display initial clue">Display initial clue</option>
                        <option value="Display all locations">Display all locations</option>
                        <option value="Show map">Show map</option>
                    </select>
                    {hoveredField === 'homescreen_display' && (
                        <small className="form-text text-muted">Choose the homescreen display option.</small>
                    )}
                </div>

                {/* Dropdown for participant scoring */}
                <div className="mb-3">
                    <label>Participant Scoring</label>
                    <select
                        name="participant_scoring"
                        className="form-control"
                        value={currentProject.participant_scoring}
                        onChange={handleInputChange}
                        onMouseEnter={() => setHoveredField('participant_scoring')}
                        onMouseLeave={() => setHoveredField('')}
                    >
                        <option value="Number of Scanned QR Codes">Number of Scanned QR Codes</option>
                        <option value="Number of Locations Entered">Number of Locations Entered</option>
                    </select>
                    {hoveredField === 'participant_scoring' && (
                        <small className="form-text text-muted">Choose the participant scoring method.</small>
                    )}
                </div>

                {/* Checkbox for project published status */}
                <div className="mb-3">
                    <label>Published</label>
                    <input
                        type="checkbox"
                        name="is_published"
                        className="form-check-input"
                        checked={currentProject.is_published}
                        onChange={handleInputChange}
                        onMouseEnter={() => setHoveredField('is_published')}
                        onMouseLeave={() => setHoveredField('')}
                    />
                    {hoveredField === 'is_published' && (
                        <small className="form-text text-muted">Check to publish the project.</small>
                    )}
                </div>

                {/* Submit and Cancel buttons */}
                <button type="submit" className="btn btn-primary">
                    {currentProject.id ? 'Save Changes' : 'Add Project'}
                </button>
                {/* if issubmitting is true, 'return' button, else 'cancel' button */}
                <Link to="/projects" className="btn btn-secondary ms-2"  onClick={handleCancelClick} > {isSubmitting ? 'Return' : 'Cancel'}
                </Link>
            </form>
        </div>
    );
}

export default ProjectForm;
