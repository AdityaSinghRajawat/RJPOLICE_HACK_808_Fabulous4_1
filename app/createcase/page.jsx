"use client";
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CaseForm from '@/components/CaseForm';


const PoliceCaseForm = () => {
    const [formData, setFormData] = useState({
        caseNumber: '',
        reportedBy: '',
        dateReported: '',
        incidentType: '',
        longitude: '',
        latitude: '',
        description: '',
        status: 'Pending',
        assignedOfficer: '',
        evidence: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const newErrors = {};
        if (!formData.caseNumber) newErrors.caseNumber = 'Required';
        if (!formData.reportedBy) newErrors.reportedBy = 'Required';
        if (!formData.dateReported) newErrors.dateReported = 'Required';
        if (!formData.incidentType) newErrors.incidentType = 'Required';
        if (!formData.longitude) newErrors.longitude = 'Required';
        if (!formData.latitude) newErrors.latitude = 'Required';
        if (!formData.description) newErrors.description = 'Required';
        if (!formData.status) newErrors.status = 'Required';
        if (!formData.assignedOfficer) newErrors.assignedOfficer = 'Required';
        if (!formData.evidence) newErrors.evidence = 'Required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const response = await fetch('/api/policecase/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Police case created:', data);
        } else {
            console.error('Error creating police case');
        }

        console.log('Form submitted:', formData);

    };

    return (
        <>
            <div className="h-full hidden md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>

            <CaseForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                errors={errors}
            />

        </>
    );
};

export default PoliceCaseForm;
