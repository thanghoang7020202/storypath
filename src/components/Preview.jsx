import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getProject, getLocations } from '../api'; // API calls as you import

// Import React Leaflet for map
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import Preview styles
import './Preview.css';

/**
 * Preview component to display the project preview.
 * @returns JSX element for the Preview component
 */
const Preview = () => {
    const { id } = useParams();                                             // Get the project ID from the URL
    const [project, setProject] = useState(null);                           // State to store the project details
    const [locations, setLocations] = useState([]);                         // State to store the locations
    const [selectedLocation, setSelectedLocation] = useState('Homescreen'); // State to store the selected location
    const [points, setPoints] = useState(0);                                // State to store the total points
    const [totalPoints, setTotalPoints] = useState(0);                      // State to store the total points    
    const [locationsVisited, setLocationsVisited] = useState([]);           // State to store the locations visited

    const mapRef = useRef();                                                // Ref for the map instance

    /**
     * Fetch the project and locations when the component mounts.
     */
    useEffect(() => {
        const fetchProjectAndLocations = async () => {
            const projectData = await getProject(id);
            let locationsData = await getLocations();
            locationsData = locationsData.filter((location) => location.project_id === projectData[0].id);
            setProject(projectData[0]); // Assuming projectData is an array
            setLocations(locationsData);

            // Calculate total points
            let totalPoints = 0;
            locationsData.forEach(location => {
                totalPoints += location.score_points;
            });
            setTotalPoints(totalPoints);
        };
        fetchProjectAndLocations();
    }, [id]);

    /**
     * Handle the location change event.
     * @param {Object} event - The event object
     * @returns {void}
     * */
    const handleLocationChange = (event) => {
        const newLocation = event.target.value;
        setSelectedLocation(newLocation);

        // Update score and locations visited count
        if (newLocation !== 'Homescreen') {
            const location = locations.find((loc) => loc.location_name === newLocation);
            const newLocationsVisited = new Set([...locationsVisited, location.location_name]);
            const pointCompute = () => {
                // if the location has not been visited before, add the points
                if (!locationsVisited.includes(location.location_name)) {
                    return points + location.score_points;
                }
                return points;
            };
            setPoints(pointCompute());
            setLocationsVisited(Array.from(newLocationsVisited));
        } else {
            setPoints(0);
            setLocationsVisited([]);
        }
    };

    /**
     * Fit the map bounds to the markers.
     * @param {Object} locations - The locations array
     * @returns {null} - Returns null
     */
    const FitMapBounds = ({ locations }) => {
        const map = useMap(); // Get the map instance

        useEffect(() => {
            if (locations.length > 0) {
                const bounds = locations.map(location => {
                    const [latitude, longitude] = location.location_position.slice(1, -1).split(',').map(coord => parseFloat(coord.trim()));
                    return [latitude, longitude];
                });
                map.fitBounds(bounds); // Automatically fit bounds to markers
            }
        }, [locations, map]);

        return null;
    };

    if (!project || locations.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container-md py-5 d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">{project.title} - Preview</h2>
            <div className="mb-3 w-50 text-center">
                <label htmlFor="location-select" className="form-label">
                    Change Locations to Test Scoring:
                </label>
                <select
                    id="location-select"
                    className="form-select"
                    value={selectedLocation}
                    onChange={handleLocationChange}
                >
                    <option value="Homescreen">Homescreen</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.location_name}>
                            {location.location_name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mobile Preview Container */}
            <div
                className="mobile-preview-container p-4 shadow rounded"
                style={{ width: '350px', backgroundColor: '#fff', border: '1px solid #ddd' }}
            >
                {/* Title with purple background */}
                {selectedLocation === 'Homescreen' ? (
                    <div className="p-3 mb-4" style={{ backgroundColor: '#8A2BE2', color: '#fff', borderRadius: '8px' }}>
                    <h3 className="m-0">{project.title}</h3>
                </div>
                ) : (
                    <div className="p-3 mb-4" style={{ backgroundColor: '#8A2BE2', color: '#fff', borderRadius: '8px' }}>
                        <h3 className="m-0">{selectedLocation}</h3>
                    </div>
                )}

                {/* Instructions */}
                <div>
                    <h4>Instructions</h4>
                    <p>{project.instructions}</p>

                    {selectedLocation === 'Homescreen' ? (
                        // 3 options: Initial Clue, All Locations, or show map
                        project.homescreen_display === "Display initial clue" ? (
                            <div>
                                <h5>Initial Clue</h5>
                                <p>{project.initial_clue}</p>
                            </div>
                        ) : project.homescreen_display === "Display all locations" ? (
                            <div>
                                <h5>Locations</h5>
                                <ul>
                                    {locations.map((location) => (
                                        <li key={location.id}>{location.location_name}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <h5>Map</h5>

                                {/* Map to display locations */}
                                <MapContainer
                                    center={[51.505, -0.09]} // Default center (will auto-adjust)
                                    zoom={13}
                                    scrollWheelZoom={false}
                                    style={{ height: "300px", width: "100%" }}
                                    ref={mapRef}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {locations.map((location) => {
                                        // Extract latitude and longitude from loc.location_position
                                        const [latitude, longitude] = location.location_position.slice(1, -1).split(',').map(coord => parseFloat(coord.trim()));
                                        return (
                                            // <Marker key={location.id} position={[latitude, longitude]}>
                                            //     <Popup>
                                            //         {location.location_name}: {location.clue}
                                            //     </Popup>
                                            // </Marker>
                                            <Circle key={location.id} center={[latitude, longitude]} pathOptions={{ color: 'purple' }} radius={50} >
                                                <Popup>
                                                    {location.location_name}: {location.clue}
                                                </Popup>
                                            </Circle>
                                        );
                                    })}
                                    <FitMapBounds locations={locations} />
                                </MapContainer>
                            </div>
                        )
                    ) : (
                        <div>
                            <h5>Location Clue</h5>
                            {/* Location Clue */}
                            <p>{locations.find((loc) => loc.location_name === selectedLocation)?.clue}</p>
                            {/* location_content */}

                            <h5>Location Content</h5>
                                <div style={{ overflow: 'hidden' }}
                                    dangerouslySetInnerHTML={{
                                        __html: locations.find((loc) => loc.location_name === selectedLocation)?.location_content
                                    }}
                                />
                        </div>
                        

                    )}
                </div>

                {/* Score and Locations Visited */}
                <div className="d-flex justify-content-between mt-4">
                    <button
                        className="btn text-white"
                        style={{ backgroundColor: '#8A2BE2', width: '48%' }}
                    >
                        Points: {points} / {totalPoints}
                    </button>
                    <button
                        className="btn text-white"
                        style={{ backgroundColor: '#8A2BE2', width: '48%' }}
                    >
                        Locations Visited: {locationsVisited.length} / {locations.length}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Preview;
