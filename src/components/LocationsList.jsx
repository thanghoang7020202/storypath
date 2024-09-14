import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getLocations, deleteLocation } from '../api'; // Assuming API methods for fetching and deleting locations

/**
 * LocationsList component for displaying the list of locations.
 * @returns JSX element
 */
function LocationsList() {
    const [locations, setLocations] = useState([]);
    const { project_id } = useParams();
    let project_title = '';

    // Fetch locations from the API when the component mounts
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await getLocations(); // Fetch locations via API call

                // Filter locations by project_id if it is provided
                //data = data.filter((location) => location.project_id === project_id);

                setLocations(data); // Set the state with the fetched locations
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations(); // Call the async function
    }, []); // Empty dependency array ensures this runs once on mount

    // Handle deleting a location
    const handleDelete = async (locationId) => {
        try {
            await deleteLocation(locationId); // Delete location via API
            setLocations((prevLocations) =>
                prevLocations.filter((location) => location.id !== locationId) // Remove the deleted location from state
            );
        } catch (error) {
            console.error(`Error deleting location ${locationId}:`, error);
        }
    };

    return (
        <div className="container-md py-5">
            {/* Add a heading and a button to add a new location */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Exploring UQ - Locations for {project_id}</h1>
                <Link to={`/location/add/${project_id}`} className="btn btn-primary btn-lg"> Add Location</Link>
            </div>

            <div className="list-group">
                {locations.length > 0 ? (
                    locations.map((location) => (
                        <div
                            key={location.id}
                            className="list-group-item d-flex justify-content-between align-items-start mb-3"
                        >
                            {/* Display location name, trigger, position, and points */}
                            <div className="ms-4 me-auto">
                                <div className="d-flex align-items-center">
                                    <div className="fw-bold">{location.location_name}</div>
                                </div>
                                <p className="text-muted">Trigger: {location.location_trigger}</p>
                                <p className="text-muted">
                                    Position: ({location.location_position})
                                </p>
                                <p className="text-muted">Points: {location.score_points}</p>
                            </div>

                            {/* Add buttons for Edit, Delete, and Print QR Code */}
                            <div className="d-flex align-items-center">
                                <button className="btn btn-secondary mx-1">↑</button> {/* Move up button */}
                                <button className="btn btn-secondary mx-1">↓</button> {/* Move down button */}

                                <Link to={`/location/edit/${location.id}`} className="btn btn-warning mx-1">
                                    Edit
                                </Link>

                                <button
                                    className="btn btn-danger mx-1"
                                    onClick={() => handleDelete(location.id)}
                                >
                                    Delete
                                </button>

                                <button className="btn btn-light mx-1">Print QR Code</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No locations available.</p>
                )}
            </div>

            {/* Buttons for printing QR codes and previewing the project */}
            <div className="mt-4">
                <button className="btn btn-warning">Print QR Codes for All</button>
                <Link to="/location/preview" className="btn btn-success ms-3">Preview</Link>
            </div>
        </div>
    );
}

export default LocationsList;
