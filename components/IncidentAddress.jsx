import { useState, useEffect } from 'react';

const IncidentAddress = (props) => {
    const { data, handleChange } = props;

    

    return (
        <div className="max-w-xs md:max-w-lg mx-auto">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="streetAddress">
                    Street Address
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="streetAddress"
                    type="text"
                    placeholder="Street Address"
                    value={data.streetAddress || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="locality">
                    Locality
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="locality"
                    type="text"
                    placeholder="Locality"
                    value={data.locality || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                    City
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="city"
                    type="text"
                    placeholder="City"
                    value={data.city || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                    State
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="state"
                    type="text"
                    placeholder="State"
                    value={data.state || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="zip">
                    Zip
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="zip"
                    type="text"
                    placeholder="Zip Code"
                    value={data.zip || ''}
                    onChange={handleChange}
                />
            </div>
        </form>
        </div>

    );
};

export default IncidentAddress;
