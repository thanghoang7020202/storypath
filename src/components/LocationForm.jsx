import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { addLocation, updateLocation, getLocation } from '../api'; // Assuming you have API functions for locations
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

/**
 * LocationForm component to add or edit a location.
 * @param {Object} props - The props object (contains isNewLocation flag)
 * @returns JSX element
 */
function LocationForm({ isNewLocation }) {
    const navigate = useNavigate();                                         // Hook to navigate to a different URL
    const { id } = useParams();                                             // This ID can be either project_id (if adding new) or location_id (if editing)
    let existingLocation = null;                                            // Variable to store the existing location

    const theme = 'snow';                                                   // Quill editor theme

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],                      // Text styling options
            [{ 'header': 1 }, { 'header': 2 }],                             // Header formatting
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],                  // List options
            ['image'],                                                      // Image option
        ],
    };

    const placeholder = 'Compose an epic...';                               // Placeholder text for the editor
    const formats = ['bold', 'italic', 'underline', 'strike', 'header', 'list', 'image']; // Quill editor formats

    const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder }); // Quill editor instance

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
    const [initialLocation, setInitialLocation] = useState(currentLocation);    // State to store the initial form data for comparison

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
                    setInitialLocation(existingLocation);
                } catch (error) {
                    console.error('Error fetching location:', error);
                }
            };
            fetchLocation();
        }, [id, quill]);
    }

    /**
     * Handle input change for form fields.
     * @param {Object} event - The event object
     * @returns {void}
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentLocation({ ...currentLocation, [name]: value });
    };

    /**
     * Check if there are unsaved changes in the form.
     * @returns {boolean} - True if there are unsaved changes, false otherwise
     */
    const hasUnsavedChanges = () => {
        return JSON.stringify(currentLocation) !== JSON.stringify(initialLocation);
    };

    /**
     * Handle the cancel button click event.
     * @param {Object} event - The event object
     * @returns {void}
     */
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

    /**
     * Convert an image file to Base64 format.
     * @param {File} file - The image file
     * @returns {Promise} - The Base64 string
     */
    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result); // Base64 result
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    /**
     * Handle the image insertion event in the Quill editor.
     * @returns {void}
     */
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

    /**
     * Check if the location position is in the correct format.
     * Format: (latitude, longitude) where latitude and longitude are real numbers.
     * @param {string} locationPosition - The location position string
     * @returns {boolean} - True if the format is correct, false otherwise
     * */
    function isValidLocationPosition(locationPosition) {
        // Regular expression for validating latitude and longitude in the format (lat, long)
        const regex = /^\s*\(\s*[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)\s*\)\s*$/;
        
        // Test the location position against the regex pattern
        return regex.test(locationPosition);
    }
    
    /**
     * Handle form submission for adding or updating location.
     */
    useEffect(() => {
        if (quill) {
            // Add the image handler to Quill
            quill.getModule('toolbar').addHandler('image', handleImageInsertion);
        }
    }, [quill]);

    /**
     * Handle form submission for adding or updating location.
     * @param {Object} event - The event object
     * @returns {void}
     */
    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // check if the location_position is in the correct format (latitude, longitude) where latitude and longitude are numbers
        if (!isValidLocationPosition(currentLocation.location_position)) {
            alert("Invalid format for Location Position. Use (number,number) format.");
            return;
        }
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
        setInitialLocation(updatedLocation);
        
        //navigate(`/locations/${currentLocation.project_id}`); // Redirect after submission
    };

    return (
        <div className="container">
            <h2>{currentLocation.id ? 'Edit Location for Project ID: ' + currentLocation.project_id : 'Add Location for Project ID: ' + id}</h2>

            {/* Form to add or edit a location */}
            <form onSubmit={handleFormSubmit}>

                {/* Location Name */}
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

                {/* Location Trigger */}
                <div className="mb-3">
                    <label>Location Trigger</label>
                    <select
                        name="location_trigger"
                        className="form-control"
                        value={currentLocation.location_trigger}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Location Entry">Location Entry</option>
                        <option value="QR Code Scan">QR Code Scan</option>
                        <option value="Both Location Entry and QR Code Scan">Both Location Entry and QR Code Scan</option>
                    </select>
                </div>

                {/* Location Position */}
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

                {/* Location Order */}
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

                {/* Location Content */}
                <div className="mb-3">
                    <label>Location Content</label>
                    <div ref={quillRef} style={{ minHeight: '200px', border: '1px solid #ccc' }} />
                </div>

                {/* Extra */}
                <div className="mb-3">
                    <label>Extra</label>
                    <textarea
                        name="extra"
                        className="form-control"
                        value={currentLocation.extra}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Clue */}
                <div className="mb-3">
                    <label>Clue</label>
                    <textarea
                        name="clue"
                        className="form-control"
                        value={currentLocation.clue}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Score Points */}
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

                {/* Submit and Cancel buttons */}
                <button type="submit" className="btn btn-primary">
                    {currentLocation.id ? 'Save Changes' : 'Add Location'}
                </button>
                <Link to={`/location/${currentLocation.project_id}`} className="btn btn-secondary ms-2" onClick={handleCancelClick}> Cancel </Link>
            </form>
        </div>
    );
}

export default LocationForm;
