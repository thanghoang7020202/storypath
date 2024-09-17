import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { addLocation, updateLocation, getLocations } from '../api'; // Assuming you have API functions for locations

function LocationForm({ isNewLocation }) {
    const navigate = useNavigate();
    const { id } = useParams(); // this id can be either project_id (if adding new) or location_id (if editing)
    let existingLocation = null;

    // If this is not a new location, fetch the location details -> id is location_id
    if (!isNewLocation) {
        useEffect(() => {
            const fetchLocation = async () => {
                try {
                    const data = await getLocations(id); // Fetch location by ID
                    existingLocation = data[0];
                    setCurrentLocation({
                        id: existingLocation.id,
                        project_id: existingLocation.project_id,
                        location_name: existingLocation.location_name,
                        location_trigger: existingLocation.location_trigger,
                        location_position: existingLocation.location_position,
                        location_order: existingLocation.location_order,
                        username: existingLocation.username,
                        location_content: existingLocation.location_content,
                        extra: existingLocation.extra,
                        clue: existingLocation.clue,
                        score_points: existingLocation.score_points,
                    });
                } catch (error) {
                    console.error('Error fetching location:', error);
                }
            };
            fetchLocation();
        }, [id]);
    }

    // State to manage the current location being added or edited
    const [currentLocation, setCurrentLocation] = useState({
        id: existingLocation ? existingLocation.id : null,
        project_id: existingLocation ? existingLocation.project_id : id,
        location_name: existingLocation ? existingLocation.location_name : '',
        location_trigger: existingLocation ? existingLocation.location_trigger : '',
        location_position: existingLocation ? existingLocation.location_position : '',
        location_order: existingLocation ? existingLocation.location_order : 0,
        username: 's4759487',
        location_content: existingLocation ? existingLocation.location_content : '',
        extra: existingLocation ? existingLocation.extra : '',
        clue: existingLocation ? existingLocation.clue : '',
        score_points: existingLocation ? existingLocation.score_points : 0,
    });

    // Handle input changes for form fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentLocation({ ...currentLocation, [name]: value });
    };

    // Handle form submission for adding or updating location
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (isNewLocation) {
            delete currentLocation.id; // Remove the ID for new locations
            await addLocation(currentLocation); // Add a new location via API
            alert('Location added successfully!');
        } else {
            delete currentLocation.id; // Remove the ID before updating
            await updateLocation(id, currentLocation); // Update existing location
            alert('Location updated successfully!');
        }

        //navigate(`/locations/${project_id}`); // Redirect to the locations list after submission
    };

    return (
        <div className="container">
            <h2>{currentLocation.id ? 'Edit Location' : 'Add Location for Project ID: ' + id}</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label>Location Name</label>
                    <input
                        type="text"
                        name="location_name"
                        className="form-control"
                        value={currentLocation.location_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Location Trigger</label>
                    <input
                        type="text"
                        name="location_trigger"
                        className="form-control"
                        value={currentLocation.location_trigger}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Location Position</label>
                    <input
                        type="text"
                        name="location_position"
                        className="form-control"
                        value={currentLocation.location_position}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Location Order</label>
                    <input
                        type="number"
                        name="location_order"
                        className="form-control"
                        value={currentLocation.location_order}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Location Content</label>
                    <textarea
                        name="location_content"
                        className="form-control"
                        value={currentLocation.location_content}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Extra</label>
                    <textarea
                        name="extra"
                        className="form-control"
                        value={currentLocation.extra}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Clue</label>
                    <textarea
                        name="clue"
                        className="form-control"
                        value={currentLocation.clue}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Score Points</label>
                    <input
                        type="number"
                        name="score_points"
                        className="form-control"
                        value={currentLocation.score_points}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    {currentLocation.id ? 'Save Changes' : 'Add Location'}
                </button>
                <Link to={`/locations/${id}`} className="btn btn-secondary ms-2"> Cancel </Link>
            </form>
        </div>
    );
}

export default LocationForm;
