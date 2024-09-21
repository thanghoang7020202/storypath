import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProject, getLocations } from '../api'; // API calls as you shared

const Preview = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('Homescreen');
    const [points, setPoints] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [locationsVisited, setLocationsVisited] = useState([]);

    useEffect(() => {
        const fetchProjectAndLocations = async () => {
            const projectData = await getProject(id);
            let locationsData = await getLocations();
            locationsData = locationsData.filter((location) => location.project_id === projectData[0].id);
            setProject(projectData[0]);  // Assuming projectData is an array
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

    // Handle location change from dropdown
    const handleLocationChange = (event) => {
        const newLocation = event.target.value;
        setSelectedLocation(newLocation);

        // Update score and locations visited count
        if (newLocation !== 'Homescreen') {
            const location = locations.find((loc) => loc.location_name === newLocation);
            const newLocationsVisited = new Set([...locationsVisited, location.location_name]);
            const point = () => {
                // if the location has not been visited before, add the points
                if (!locationsVisited.includes(location.location_name)) {
                    return points + location.score_points;
                }
                return points;
            };
            setPoints(point());
            setLocationsVisited(Array.from(newLocationsVisited));
        } else {
            setPoints(0);
            setLocationsVisited([]);
        }
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
                <div className="p-3 mb-4" style={{ backgroundColor: '#8A2BE2', color: '#fff', borderRadius: '8px' }}>
                    <h3 className="m-0">{project.title}</h3>
                </div>

                {/* Instructions */}
                <div>
                    <h4>Instructions</h4>
                    <p>{project.instructions}</p>

                    
                    {selectedLocation === 'Homescreen' ? (
                        <div>
                            <h5>Initial Clue</h5>
                            <p>{project.initial_clue}</p>
                        </div>                        
                    ) : (
                        <div>
                            <h5>Location Clue</h5>
                            <p>{locations.find((loc) => loc.location_name === selectedLocation)?.clue}</p>
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
