import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code'; // Import QRCode component
import { getLocations } from '../api'; // Import getLocations and getProjects functions
import { Spinner } from 'react-bootstrap'; // Import Spinner for loading state

/**
 * QRCodeComponent displays QR codes for all locations or one specific location.
 */
function QRCodeComponent({ isSingle }) {
    const { id } = useParams(); // Get location ID from the route parameters
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // For navigation back to the LocationList

    useEffect(() => {
        // Fetch locations data when the component is mounted
        const fetchLocationsAndProject = async () => {
            try {
                setLoading(true);
                let data = await getLocations(); // Fetch locations via API call

                if (isSingle) { // If the id is location id
                    data = data.filter((location) => location.id == id); // ignore the type comparison
                } else { // the id is project id
                    data = data.filter((location) => location.project_id == id); // ignore the type comparison
                }
                setLocations(data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocationsAndProject();

    }, [id, isSingle]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="mb-4">
                <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                    &larr; Back to Locations
                </button>
            </div>

            <div className="text-center">
                <h2 className="mb-5">{isSingle ? 'Location QR Code' : 'QR Codes for All Locations'}</h2>
            </div>

            <div className="row">
                {locations.map((location) => (
                    <div key={location.id} className="col-md-4 col-sm-6 mb-4">
                        <div className="card shadow-sm p-4 text-center">
                            {/* make the QRCode central */}
                            <h5 className="card-title mb-3 ">{location.location_name}</h5>
                            <QRCode value={location.location_name} size={300} className="mb-3 mx-auto" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QRCodeComponent;
