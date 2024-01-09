import React from 'react';

const CitizenDetail = ({ data, handleChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange({ [name]: value }, 0);
    };
    // console.log(data);
    return (
        <div className="max-w-xs md:max-w-lg mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="name"
                        type="text"
                        placeholder="Name..."
                        value={data.name || ''}
                        onChange={(e) => handleChange(e, 0)} 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                        Contact
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="phone"
                        type="text"
                        placeholder="Contact..."
                        value={data.phone || ''}
                        onChange={(e) => handleChange(e, 0)} 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="email"
                        type="email"
                        placeholder="Email..."
                        value={data.email || ''}
                        onChange={(e) => handleChange(e, 0)} 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadhar">
                        Aadhar ID
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="aadharId"
                        type="text"
                        placeholder="Aadhar ID..."
                        value={data.aadharId || ''}
                        onChange={(e) => handleChange(e, 0)} // Update the onChange handler
                    />
                </div>
            </form>
        </div>
    );
};

export default CitizenDetail;
