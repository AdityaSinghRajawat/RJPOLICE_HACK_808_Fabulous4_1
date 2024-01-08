// components/ReportCard.js
import React from 'react';

const ReportCard = ({ cas }) => {
    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Case Details</h2>
            <div className="mb-4">
                <strong className="text-blue-600">Case Number:</strong> {cas.caseNumber}
            </div>
            <div className="mb-4">
                <strong>Reported By:</strong> {cas.reportedBy}
            </div>
            <div className="mb-4">
                <strong>Date Reported:</strong> {cas.dateReported}
            </div>
            <div className="mb-4">
                <strong>Incident Type:</strong> {cas.incidentType}
            </div>
            <div className="mb-4">
                <strong>Status:</strong> {cas.status}
            </div>
            <div className="mb-4">
                {/* <strong>Location:</strong> Latitude {cas.latitude}, Longitude {cas.longitude} */}
                <strong>Location:</strong> Longitude {cas.location.coordinates[0]}, Latitude {cas.location.coordinates[1]}
            </div>
            <div className="mb-4">
                <strong>Description:</strong> {cas.description}
            </div>
            <div className="mb-4">
                <strong>Assigned Officer:</strong> {cas.assignedOfficer}
            </div>
            <div className="mb-4">
                <strong>Evidence:</strong> {cas.evidence}
            </div>
        </div>
    );
};

export default ReportCard;
