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
        // extra: existingLocation ? existingLocation.extra : '',
        clue: existingLocation ? existingLocation.clue : '',
        score_points: existingLocation ? existingLocation.score_points : 0,
    });
    const [initialLocation, setInitialLocation] = useState(currentLocation);    // State to store the initial form data for comparison

    const [hoveredField, setHoveredField] = useState('');                       // State to track hovered field
    const [errorFields, setErrorFields] = useState({});                         // Track error fields
    const [isSubmitting, setIsSubmitting] = useState(false);                    // State to manage form submission

    // If this is not a new location, fetch the location details -> id is location_id
    if (!isNewLocation) {
        useEffect(() => {
            const fetchLocation = async () => {
                try {
                    const data = await getLocation(id);
                    existingLocation = data[0];
                    const temp = {
                        id: existingLocation.id,
                        project_id: existingLocation.project_id,
                        location_name: existingLocation.location_name,
                        location_trigger: existingLocation.location_trigger,
                        location_position: existingLocation.location_position,
                        location_order: existingLocation.location_order,
                        username: existingLocation.username,
                        location_content: existingLocation.location_content,
                        clue: existingLocation.clue,
                        score_points: existingLocation.score_points,
                    };
                    if (quill) {
                        quill.clipboard.dangerouslyPasteHTML(existingLocation.location_content); // Load the existing content into the editor
                    }
                    setCurrentLocation(temp);
                    setInitialLocation(temp);
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
            // send a confirmation dialog if there are unsaved changes and showing what fields have changed
            const confirmLeave = window.confirm(
                'You have unsaved changes. Are you sure you want to leave without saving?\nChanges:\n' +
                    JSON.stringify(currentLocation) +
                    '\nInitial:\n' +
                    JSON.stringify(initialLocation)
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

        // Reset error fields
        // check if the location_position is in the correct format (latitude, longitude) where latitude and longitude are numbers
        setErrorFields({});
        // Validate required fields
        const requiredFields = ['location_name', 'location_trigger', 'location_position'];
        let newErrorFields = {};
        requiredFields.forEach(field => {
            if (!currentLocation[field]) {
                newErrorFields[field] = true;
            }
        });
        setErrorFields(newErrorFields);

        // check if the location_position is in the correct format (latitude, longitude) where latitude and longitude are numbers
        if (!isValidLocationPosition(currentLocation.location_position)) {
            alert("Invalid format for Location Position. Use (number,number) format.");
            return;
        }

        if (Object.keys(newErrorFields).length > 0) {
            return; // Stop submission if there are errors
        }

        // Get the content from Quill editor, which includes images in Base64
        const locationContent = quill.root.innerHTML;

        let temp = {
            ...currentLocation,
            location_content: locationContent,
        };
        setCurrentLocation(temp);   // Update the current location state
        setInitialLocation(temp);   // Set the initial location to the current location
        setIsSubmitting(true);      // Set isSubmitting to true after form submission
        
        // Remove the ID before adding/updating the location
        delete temp.id;
        if (isNewLocation) {    
            await addLocation(temp); // Add new location
            alert('Location added successfully!');
        } else {
            await updateLocation(id, temp); // Update the existing location
            alert('Location updated successfully!');
        }
    };

    return (
        <div className="container">
            <h2>{currentLocation.id ? 'Edit Location for Project ID: ' + currentLocation.project_id : 'Add Location for Project ID: ' + id}</h2>

            <form onSubmit={handleFormSubmit}>

                {/* Location Name */}
                <div className="mb-3">
                    <label>Location Name</label>
                    <input
                        type="text"
                        name="location_name"
                        className={`form-control ${errorFields.location_name ? 'is-invalid' : ''}`} // Add red border for errors
                        value={currentLocation.location_name}
                        onChange={handleInputChange}
                        onMouseEnter={() => setHoveredField('location_name')}
                        onMouseLeave={() => setHoveredField('')}
                        required
                    />
                    {hoveredField === 'location_name' && (
                        <small className="form-text text-muted">The name of the location, required for submission.</small>
                    )}
                </div>

                {/* Location Trigger */}
                <div className="mb-3">
                    <label>Location Trigger</label>
                    <select
                        name="location_trigger"
                        className={`form-control ${errorFields.location_trigger ? 'is-invalid' : ''}`} // Add red border for errors
                        value={currentLocation.location_trigger}
                        onChange={handleInputChange}
                        onMouseEnter={() => setHoveredField('location_trigger')}
                        onMouseLeave={() => setHoveredField('')}
                        required
                    >
                        <option value="Location Entry">Location Entry</option>
                        <option value="QR Code Scan">QR Code Scan</option>
                        <option value="Both Location Entry and QR Code Scan">Both Location Entry and QR Code Scan</option>
                    </select>
                    {hoveredField === 'location_trigger' && (
                        <small className="form-text text-muted">Select how the location can be triggered.</small>
                    )}
                </div>

                {/* Location Position */}
                <div className="mb-3">
                    <label>Location Position</label>
                    <input
                        type="text"
                        name="location_position"
                        className={`form-control ${errorFields.location_position ? 'is-invalid' : ''}`} // Add red border for errors
                        value={currentLocation.location_position}
                        onChange={handleInputChange}
                        onMouseEnter={() => setHoveredField('location_position')}
                        onMouseLeave={() => setHoveredField('')}
                        required
                    />
                    {hoveredField === 'location_position' && (
                        <small className="form-text text-muted">Format: (latitude,longitude), e.g., (40.7128,-74.0060)</small>
                    )}
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
                        onMouseEnter={() => setHoveredField('location_order')}
                        onMouseLeave={() => setHoveredField('')}
                    />
                    {hoveredField === 'location_order' && (
                        <small className="form-text text-muted">The order in which the location appears in the project.</small>
                    )}
                </div>

                {/* Clue */}
                <div className="mb-3">
                    <label>Clue</label>
                    <input
                        type="text"
                        name="clue"
                        className="form-control"
                        value={currentLocation.clue}
                        onChange={handleInputChange}
                        onMouseEnter={() => setHoveredField('clue')}
                        onMouseLeave={() => setHoveredField('')}
                    />
                    {hoveredField === 'clue' && (
                        <small className="form-text text-muted">A clue to help users find the location. Optional.</small>
                    )}
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
                        onMouseEnter={() => setHoveredField('score_points')}
                        onMouseLeave={() => setHoveredField('')}
                        required
                    />
                    {hoveredField === 'score_points' && (
                        <small className="form-text text-muted">Specify the number of points participants earn by reaching this location, required
for submission.</small>
                    )}
                </div>

                {/* Content */}
                <div className="mb-3">
                    <label>Content</label>
                    <div ref={quillRef} 
                        className={`form-control ${errorFields.location_content ? 'is-invalid' : ''}`} // Add red border for errors
                        style={{ height: '200px' }}
                        onMouseEnter={() => setHoveredField('location_content')}
                        onMouseLeave={() => setHoveredField('')}
                    />
                    {hoveredField === 'location_content' && (
                        <small className="form-text text-muted">Add content for the location.</small>
                    )}
                </div>

                {/* Buttons */}
                <button type="submit" className="btn btn-primary">
                    {isNewLocation ? 'Add Location' : 'Update Location'}
                </button>
                {/* if issubmitting is true, 'return' button, else 'cancel' button */}
                <Link to={`/location/${currentLocation.project_id}`} className="btn btn-secondary ms-2"  onClick={handleCancelClick} > {isSubmitting ? 'Return' : 'Cancel'}
                </Link>
            </form>
        </div>
    );
}

export default LocationForm;
