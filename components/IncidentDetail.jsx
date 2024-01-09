import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';

const IncidentDetail = ({ data, handleChange }) => {
    const [fetchingLocation, setFetchingLocation] = useState(false);
    const getLocation = () => {
        setFetchingLocation(true);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    handleChange(
                        {
                            target: {
                                name: 'location',
                                value: { latitude: latitude.toString(), longitude: longitude.toString() },
                            },
                        },
                        1
                    );
                    setFetchingLocation(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setFetchingLocation(false);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            setFetchingLocation(false);
        }
    };
    

    return (
        <div className="max-w-xs md:max-w-lg mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                        Type of Incident
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="type"
                        type="text"
                        placeholder="Eg. Theft, harassment..."
                        value={data.type || ''}
                        onChange={(e) => handleChange(e, 1)} // Assuming 1 is the step number for Incident Details
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description of Incident
                    </label>
                    <textarea
                        className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="description"
                        placeholder="Description of Incident..."
                        value={data.description || ''}
                        onChange={(e) => handleChange(e, 1)} // Assuming 1 is the step number for Incident Details
                    ></textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateTime">
                        Date and Time of Incident
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="dateTime"
                        type="datetime-local"
                        value={data.dateTime || ''}
                        onChange={(e) => handleChange(e, 1)} // Assuming 1 is the step number for Incident Details
                    />
                </div>
                <Button
                    variant="primary"
                    type="button"
                    disabled={fetchingLocation}
                    onClick={getLocation}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {fetchingLocation && (
                        <Spinner animation="border" role="status" className="position-absolute top-50 start-50 translate-middle">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                    {!fetchingLocation && 'Get Location'}
                </Button>
                {data.location.latitude && data.location.longitude && (
                    <div className="mb-6">
                        <p>Latitude: {data.location.latitude}</p>
                        <p>Longitude: {data.location.longitude}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default IncidentDetail;
