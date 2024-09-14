import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProjectsContext } from '../data/ProjectsContext';
import { deleteProject, getProjects} from '../api';

/**
 * ProjectList component for displaying the list of projects.
 * @returns JSX element
 */
function ProjectList() {
    // Fetch projects from context
    const [projectList, setProjectList] = useState([]);

    // Fetch projects from the API when the component mounts
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects(); // Await the async call to getProjects
                setProjectList(data); // Set the state with the fetched projects
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects(); // Call the async function
    }, []); // Empty dependency array ensures this runs once on mount

    // Handle deleting a project
    const handleDelete = async (projectId) => {
        try {
            await deleteProject(projectId); // Delete project from the API
            setProjectList((prevProjects) =>
                prevProjects.filter((proj) => proj.id !== projectId) // Remove the deleted project from state
            );
        } catch (error) {
            console.error(`Error deleting project ${projectId}:`, error);
        }
    };

    return (
        <div className="container-md py-5">
            {/* Add a heading and a button to add a new project */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Projects</h1>
                <Link to="/project/add" className="btn btn-primary btn-lg">Add Project</Link>
            </div>

            <div className="list-group">
                {projectList.length > 0 ? (
                    projectList.map((project) => (
                        <div
                            key={project.id}
                            className="list-group-item d-flex justify-content-between align-items-start mb-3"
                        >
                            {/* Display the project title and description */}
                            <div className="ms-4 me-auto">
                                {/* Wrap title and status in one div to align them horizontally */}
                                <div className="d-flex align-items-center">
                                    <div className="fw-bold">{project.title}</div>
                                    {/* Dynamically display the status of the project next to the title */}
                                    <span
                                        className={`badge ms-2 ${
                                            project.is_published === true
                                                ? 'bg-success'
                                                : 'bg-secondary'
                                        }`}
                                    >
                                        {project.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                                <p className="text-muted">{project.description}</p>
                            </div>

                            {/* Add buttons for Edit, View Locations, and Delete */}
                            <div className="d-flex align-items-center">
                                <Link to={`/project/edit/${project.id}`} className="btn btn-warning mx-1">
                                    Edit
                                </Link>

                                {/* View Locations button */}
                                <Link
                                    to={`/projects/${project.id}`}
                                    className="btn btn-light mx-1 text-decoration-none"
                                >
                                    View Locations
                                </Link>

                                <button
                                    className="btn btn-danger mx-1"
                                    onClick={() => handleDelete(project.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No projects available.</p>
                )}
            </div>
        </div>
    );
}

export default ProjectList;
