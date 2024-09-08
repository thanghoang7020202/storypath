import React, { useState } from 'react';
import { projectsData } from '../data/projects';

function ProjectForm({isNewProject}) {
    // get the id from the URL
    let id = null;
    let existingProject;

    if (!isNewProject) {
        const id = window.location.pathname.split('/').pop();
        existingProject = projectsData.find(project => project.id == id);
    }

    // State to manage the projects
    const [projects, setProjects] = useState(projectsData);

    // State to manage the current project being added or edited
    const [currentProject, setCurrentProject] = useState({
        id: existingProject ? existingProject.id : null,
        title: existingProject ? existingProject.title : '',
        description: existingProject ? existingProject.description : '',
        instructions: existingProject ? existingProject.instructions : '',
        initialClue: existingProject ? existingProject.initialClue : '',
        homescreenDisplay: existingProject ? existingProject.homescreenDisplay : 'Display initial clue',
        participantScoring: existingProject ? existingProject.participantScoring : 'Number of Scanned QR Codes',
        status: existingProject ? existingProject.status : 'Published',
        published: existingProject ? existingProject.published : false
    });

    // Handle input change for form fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentProject({ ...currentProject, [name]: value });
    };

    // Handle form submission to add or update project
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (currentProject.id) {
        // Update existing project
        setProjects(
            projects.map((project) =>
            project.id === currentProject.id ? currentProject : project
            )
        );
        } else {
        // Add new project
        setProjects([
            ...projects,
            { ...currentProject, id: projects.length + 1 },
        ]);
        }

        // // Reset form
        // setCurrentProject({
        // id: null,
        // title: '',
        // description: '',
        // instructions: '',
        // initialClue: '',
        // homescreenDisplay: 'Display initial clue',
        // participantScoring: 'Number of Scanned QR Codes',
        // status: '',
        // published: false,
        // });
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
                value={currentProject.description}
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
                name="initialClue"
                className="form-control"
                value={currentProject.initialClue}
                onChange={handleInputChange}
            />
            </div>

            <div className="mb-3">
            <label>Homescreen Display</label>
            <select
                name="homescreenDisplay"
                className="form-control"
                value={currentProject.homescreenDisplay}
                onChange={handleInputChange}
            >
                <option value="Display initial clue">Display initial clue</option>
                <option value="Display nothing">Display nothing</option>
            </select>
            </div>

            <div className="mb-3">
            <label>Participant Scoring</label>
            <select
                name="participantScoring"
                className="form-control"
                value={currentProject.participantScoring}
                onChange={handleInputChange}
            >
                <option value="Number of Scanned QR Codes">Number of Scanned QR Codes</option>
                <option value="Time Taken to Complete">Time Taken to Complete</option>
            </select>
            </div>

            <div className="mb-3">
            <label>Status</label>
            <select
                name="status"
                className="form-control"
                value={currentProject.status}
                onChange={handleInputChange}
                required
            >
                <option value="Published">Published</option>
                <option value="In Progress">In Progress</option>
            </select>
            </div>

            <div className="form-check mb-3">
            <input
                type="checkbox"
                className="form-check-input"
                name="published"
                checked={currentProject.published}
                onChange={() =>
                setCurrentProject({ ...currentProject, published: !currentProject.published })
                }
            />
            <label className="form-check-label">Published</label>
            </div>

            <button type="submit" className="btn btn-primary"
                onClick={() => {
                        handleFormSubmit;
                        alert("Project saved successfully!");
                    }
                }
            >
                {
                    currentProject.id ? 'Save Changes' : 'Add Project'
                }
            </button>
            <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => {
                    projectsData = projects;
                    const userConfirmed = window.confirm("Are you sure you want to leave?");

                    if (userConfirmed) {
                        window.history.back();
                    }
                }}
            >
                Leave
            </button>
        </form>

        {/* <h3 className="mt-5">Projects List</h3>
        <ul className="list-group">
            {projects.map((project) => (
            <li key={project.id} className="list-group-item d-flex justify-content-between">
                <div>
                <strong>{project.title}</strong> - {project.description}
                </div>
                <button
                className="btn btn-sm btn-warning"
                onClick={() => handleEditProject(project.id)}
                >
                Edit
                </button>
            </li>
            ))}
        </ul> */}
        </div> 
    );
}

export default ProjectForm;
