import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getLocations, deleteLocation, updateLocation, getProject } from '../api'; // Assuming API methods for fetching, deleting, and updating locations

/**
 * LocationsList component for displaying the list of locations.
 * @returns JSX element
 */
function LocationsList() {
    const [locations, setLocations] = useState([]);                                 // State to manage locations
    const { id } = useParams();                                                     // Get the project ID from the URL
    const [project_title, setProjectTitle] = useState('');                          // State to store the project title
    const navigate = useNavigate();                                                 // Use navigate to redirect to QRCode component

    /**
     * Fetch locations from the API when the component mounts.
     */
    useEffect(() => {
        const fetchLocationsAndProject = async () => {
            try {
                let data = await getLocations(); // Fetch locations via API call
                const project = await getProject(id); // Fetch project details by project id
                data = data.filter((location) => location.project_id === project[0].id);
                setProjectTitle(project[0].title);
                setLocations(data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocationsAndProject(); // Call the async function
    }, [id]); // Call the async function when the project ID changes

    /**
     * Function to delete a location.
     * @param {number} locationId - The ID of the location to delete
     */
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

    /**
     * Function to move a location up by decreasing its location_order.
     * @param {number} index - The index of the location to move up
     */
    const handleMoveUp = async (index) => {
        if (index === 0) return; // Can't move the first item up
        const updatedLocations = [...locations];
        const currentLocation = updatedLocations[index];
        const previousLocation = updatedLocations[index - 1];

        // Swap the orders
        const tempOrder = currentLocation.location_order;
        currentLocation.location_order = previousLocation.location_order;
        previousLocation.location_order = tempOrder;

        // Update the locations in the state
        setLocations(sortLocations(updatedLocations));

        // Update both locations on the server
        await updateLocation(currentLocation.id, currentLocation);
        await updateLocation(previousLocation.id, previousLocation);
    };

    /**
     * Function to move a location down by increasing its location_order.
     * @param {number} index - The index of the location to move down
     */
    const handleMoveDown = async (index) => {
        if (index === locations.length - 1) return; // Can't move the last item down
        const updatedLocations = [...locations];
        const currentLocation = updatedLocations[index];
        const nextLocation = updatedLocations[index + 1];

        // Swap the orders
        const tempOrder = currentLocation.location_order;
        currentLocation.location_order = nextLocation.location_order;
        nextLocation.location_order = tempOrder;

        // Update the locations in the state
        setLocations(sortLocations(updatedLocations));

        // Update both locations on the server
        await updateLocation(currentLocation.id, currentLocation);
        await updateLocation(nextLocation.id, nextLocation);
    };

    // Sort locations by location_order
    const sortLocations = (locations) => {
        return locations.sort((a, b) => a.location_order - b.location_order);
    };

    return (
        <div className="container-md py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Locations for Project: {project_title}</h1>

                {/* Buttons for printing QR codes and previewing the project */}
                <div className="d-flex">
                    <Link to={`/qrcode/all/${id}`} className="btn btn btn-light"> Print QR Codes for All </Link>
                    <Link to={`/projects/previews/${id}`} className="btn btn btn-light ms-3">
                        Preview
                    </Link>
                </div>
            </div>

            {/* Add a heading and a button to add a new location */}
            <div className="mt-4 mb-3">
                <Link to={`/location/add/${id}`} className="btn btn-primary btn-lg">
                    Add Location
                </Link>
            </div>

            {/* Display the list of locations */}
            <div className="list-group">
                {locations.length > 0 ? (
                    locations.map((location, index) => (
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
                                    Position: {location.location_position}
                                </p>
                                <p className="text-muted">Points: {location.score_points}</p>
                            </div>

                            {/* Add buttons for Edit, Delete, Move Up, Move Down, and view QR Code */}
                            <div className="d-flex align-items-center">
                                <button
                                    className="btn btn-secondary mx-1"
                                    onClick={() => handleMoveUp(index)}
                                    disabled={index === 0} // Disable "Up" button for the first item
                                >
                                    ↑
                                </button>
                                <button
                                    className="btn btn-secondary mx-1"
                                    onClick={() => handleMoveDown(index)}
                                    disabled={index === locations.length - 1} // Disable "Down" button for the last item
                                >
                                    ↓
                                </button>

                                <Link to={`/location/edit/${location.id}`} className="btn btn-warning mx-1">
                                    Edit
                                </Link>

                                <button
                                    className="btn btn-danger mx-1"
                                    onClick={() => handleDelete(location.id)}
                                >
                                    Delete
                                </button>

                                <button className="btn btn-light mx-1" onClick={() => navigate(`/qrcode/single/${location.id}`)}>
                                    View QR Code
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No locations available.</p>
                )}
            </div>
        </div>
    );
}

export default LocationsList;
