import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { addLocation, updateLocation, getLocation } from '../api'; // Assuming you have API functions for locations
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

function LocationForm({ isNewLocation }) {
    const navigate = useNavigate();
    const { id } = useParams(); // This ID can be either project_id (if adding new) or location_id (if editing)
    let existingLocation = null;

    const theme = 'snow';

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // Text styling options
            [{ 'header': 1 }, { 'header': 2 }],         // Header formatting
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // List options
            ['image'],                                  // Image option
        ],
    };

    const placeholder = 'Compose an epic...';
    const formats = ['bold', 'italic', 'underline', 'strike', 'header', 'list', 'bullet', 'image'];

    const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });

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

    // If this is not a new location, fetch the location details -> id is location_id
    if (!isNewLocation) {
        useEffect(() => {
            const fetchLocation = async () => {
                try {
                    const data = await getLocation(id);
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
                    if (quill) {
                        quill.clipboard.dangerouslyPasteHTML(existingLocation.location_content); // Load the existing content into the editor
                    }
                } catch (error) {
                    console.error('Error fetching location:', error);
                }
            };
            fetchLocation();
        }, [id, quill]);
    }

    // Handle input changes for form fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentLocation({ ...currentLocation, [name]: value });
    };

    // Convert image to Base64 for saving in JSON
    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result); // Base64 result
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    // Handle images in Quill editor by converting them to Base64
    const handleImageInsertion = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const base64 = await convertImageToBase64(file);
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', base64);
        };
    };

    useEffect(() => {
        if (quill) {
            // Add the image handler to Quill
            quill.getModule('toolbar').addHandler('image', handleImageInsertion);
        }
    }, [quill]);

    // Handle form submission for adding or updating location
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Get the content from Quill editor, which includes images in Base64
        const locationContent = quill.root.innerHTML;

        const updatedLocation = {
            ...currentLocation,
            location_content: locationContent, // Save the editor content
        };

        if (isNewLocation) {
            delete updatedLocation.id; // Remove the ID for new locations
            await addLocation(updatedLocation); // Add a new location via API
            alert('Location added successfully!');
        } else {
            await updateLocation(id, updatedLocation); // Update existing location
            alert('Location updated successfully!');
        }

        navigate(`/locations/${currentLocation.project_id}`); // Redirect after submission
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
                    <div ref={quillRef} style={{ minHeight: '200px', border: '1px solid #ccc' }} />
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
