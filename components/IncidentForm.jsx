"use client"
import React, { useState, useEffect } from 'react';
import CitizenDetail from './CitizenDetail';
import IncidentDetail from './IncidentDetail';
import IncidentAddress from './IncidentAddress';
import IncidentOTP from './IncidentOTP';

const steps = ['Citizen Details', 'Incident Details', 'Incident Address', 'OTP Verification'];

const IncidentForm = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [reportId, setReportId] = useState(null);
    const [isReportSubmitted, setIsReportSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        incidentDetails: {
            type: '',
            description: '',
            dateTime: '',
            location: {
                coordinates: {
                    latitude: 0,
                    longitude: 0,
                },
                address: '',
            },
            additionalDetails: '',
        },
        citizenInformation: {
            name: '',
            contact: {
                phone: '',
                email: '',
            },
            aadharId: '',
        },
    });

    const [step1Data, setStep1Data] = useState({
        name: '',
        contact: {
            phone: '',
            email: '',
        },
        aadharId: '',
    });

    const [step2Data, setStep2Data] = useState({
        type: '',
        description: '',
        dateTime: '',
        location: {
            coordinates: {
                latitude: 0,
                longitude: 0,
            },
            address: '',
        },
    });

    const [step3Data, setStep3Data] = useState({
        streetAddress: '',
        locality: '',
        city: '',
        state: '',
        zip: '',
    });

    const [activeTab, setActiveTab] = useState(0);

    const handleStepChange = (step, newData) => {
        switch (step) {
            case 0:
                setStep1Data({ ...step1Data, ...newData });
                break;
            case 1:
                setStep2Data({ ...step2Data, ...newData });
                break;
            case 2:
                setStep3Data({ ...step3Data, ...newData });
                break;
            default:
                break;
        }
    };

    const handleChange = (event, step) => {
        const { name, value } = event.target;
        handleStepChange(step, { [name]: value });
    };

    const handleTabChange = (index) => {
        const validateStep = (step) => {
            switch (step) {
                case 0:
                    return step1Data.name && step1Data.phone && step1Data.email && step1Data.aadharId;
                case 1:
                    console.log(step2Data);
                    return step2Data.type && step2Data.description && step2Data.dateTime && step2Data.location.latitude && step2Data.location.longitude;
                case 2:
                    return step3Data.streetAddress && step3Data.locality && step3Data.city && step3Data.state && step3Data.zip;
                default:
                    return true;
            }
        };
        if(index>activeTab){
        if (validateStep(activeTab)) {
        var activeStep = index-1;
        // console.log(activeStep);
        switch (activeStep) {
            case 0:
                setFormData((prevData) => ({
                    ...prevData,
                    citizenInformation: {
                        name: step1Data.name,
                        contact: {
                            phone: step1Data.phone,
                            email: step1Data.email,
                        },
                        aadharId: step1Data.aadharId,
                    },
                }));
                // console.log("step 1 data updated");
                break;
            case 1:
                setFormData((prevData) => ({
                    ...prevData,
                    incidentDetails: {
                        type:step2Data.type,
                        description:step2Data.description,
                        dateTime:step2Data.dateTime,
                        location:{
                            coordinates: {
                                latitude: step2Data.location.latitude,
                                longitude: step2Data.location.longitude,
                            },
                            address: '',
                        }
                    },
                }));
                // console.log("step 2 data updated");

                break;
            case 2:

                const addressString = `${step3Data.streetAddress}, ${step3Data.locality}, ${step3Data.city}, ${step3Data.state}, ${step3Data.zip}`;
                setFormData((prevData) => ({
                    ...prevData,
                    incidentDetails: {
                        ...prevData.incidentDetails,
                        location: {
                            ...prevData.incidentDetails.location,
                            address: addressString,
                        },
                    },
                }));
                // console.log("step 3 data updated");

                break;
            case 3:
                // console.log(formData);
                break;
            default:
                break;
        }
        // console.log(formData);
        setActiveTab(index);
    }else{
        alert("Fill all fields");
    }}else{
        setActiveTab(index);
    }
    };

    useEffect(() => {
        // console.log(formData);
    }, [formData]);
    // useEffect(() => {
        // if(isVerified){
            const submitReport = async () => {
                try {
                    const response = await fetch("/api/incident-report", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            reportData: formData,
                        }),
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        setIsReportSubmitted(true);
                        setReportId(data.reportId);
                    } else {
                        setIsReportSubmitted(false);
                        alert('Failed to create report, please try again.');
                    }
                } catch (error) {
                    console.error('Error creating report:', error);
                }
            };
        // }
    // }, [isVerified]); // This will log formData whenever it changes
    
    
    const formElements = [
        <CitizenDetail data={step1Data} handleChange={(e) => handleChange(e, 0)} />,
        <IncidentDetail data={step2Data} handleChange={(e) => handleChange(e, 1)} />,
        <IncidentAddress data={step3Data} handleChange={(e) => handleChange(e, 2)} />,
        <IncidentOTP handleChange={(e) => handleChange(e, 3)} data={formData} verifiedFunction={setIsVerified} />,
    ];
    const progressBarWidth = ((activeTab + 1) / formElements.length) * 100;

    return (
        <div className="min-h-screen flex flex-col justify-center bg-gray-100">
            {isReportSubmitted ? <div className="mx-auto max-w-lg text-center">
                    <p className="text-2xl font-semibold mb-4">Report Created Successfully!</p>
                    <p className="text-lg mb-4">Your report ID: {reportId}</p>
                </div>:<><div className="mb-4 mx-auto max-w-xs md:max-w-lg">
                <div className="flex items-center justify-between px-4">
                    <div className="text-lg font-semibold">{steps[activeTab]}</div>
                    <div className="text-sm text-gray-600">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Step {activeTab + 1} of {formElements.length}
                    </div>
                </div>
                <div className="bg-blue-200 h-2 rounded-full overflow-hidden">
                    <div
                        className="bg-blue-600 h-full transition-all duration-300"
                        style={{ width: `${progressBarWidth}%` }}
                    ></div>
                </div>
            </div>
            <div>
            {formElements[activeTab]}
            </div>
            <div className="flex flex-wrap gap-x-6 mx-auto">
                <button
                    disabled={activeTab === 0}
                    onClick={() => handleTabChange(activeTab - 1)}
                    className={`px-4 py-2 rounded-xl bg-blue-600 text-white ${
                        activeTab === 0 ? 'opacity-50 bg-slate-600' : 'opacity-100'
                    }`}
                >
                    Back
                </button>
                <button
                    disabled={activeTab === formElements.length - 1}
                    onClick={() => handleTabChange(activeTab + 1)}
                    className={`px-4 py-2 rounded-xl bg-blue-600 text-white ${
                        activeTab === formElements.length - 1
                            ? 'opacity-50 bg-slate-600'
                            : 'opacity-100'
                    }`}
                >
                    Next
                </button>
                {isVerified && activeTab === formElements.length - 1 && (
                    <button className="px-4 py-2 rounded-xl bg-blue-600 text-white" onClick={submitReport}>
                        Submit
                    </button>
                )}

            </div></>}
            {/* {isReportSubmitted && reportId && (
                <div className="mx-auto max-w-lg text-center">
                    <p className="text-2xl font-semibold mb-4">Report Created Successfully!</p>
                    <p className="text-lg mb-4">Your report ID: {reportId}</p>
                </div>
            )} */}
        </div>
    );
};

export default IncidentForm;
