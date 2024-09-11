import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { projectsData } from '../data/projects';
import { useContext } from 'react';
import { ProjectsContext } from '../data/ProjectsContext';
//import { ProjectsProvider } from '../data/ProjectsContext';

/**
 * ProjectList component for displaying the list of projects.
 * @returns JSX element
 */
function ProjectList() {
    const [projects, setProjects] = useState(projectsData);
    
    useEffect(() => {
        try {
            setProjects(JSON.parse(localStorage.getItem('projects')));
        } catch (error) {
            console.error('Error parsing projects data: ', error);
        }
    }, []);
    
    return (
        <div className="container-md py-5">
            {/* Add a heading and a button to add a new project */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Projects</h1>
                <Link to="/project/add" className="btn btn-primary btn-lg">Add Project</Link>
            </div>

            <div className="list-group">
                {projects.map((project) => (
                <div key={project.id} className="list-group-item d-flex justify-content-between align-items-start mb-3">
                    {/* Display the project title and description */}
                    <div className="ms-4 me-auto">
                        {/* Wrap title and status in one div to align them horizontally */}
                        <div className="d-flex align-items-center">
                            <div className="fw-bold">{project.title}</div>
                            {/* Dynamically display the status of the project next to the title */}
                            <span className={`badge ${project.status === 'Published' ? 'bg-success' : 'bg-secondary'} rounded-pill ms-2`}>
                            {project.status}
                            </span>
                        </div>
                        
                        <p className="text-muted">{project.description}</p>
                    </div>

                    

                    {/* Add buttons for Edit, View Locations, and Delete */}
                    <div className="d-flex align-items-center">
                        <button className="btn btn-warning mx-1">Edit</button>

                        {/* View Locations button */}
                        <Link to={`/projects/${project.id}`} className="btn btn-light mx-1 text-decoration-none">
                            View Locations
                        </Link>

                        <button className="btn btn-danger mx-1">Delete</button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

// ProjectList.propTypes = {
//   projects: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       status: PropTypes.string.isRequired, // Added status validation
//     })
//   ).isRequired,
// };

export default ProjectList;
