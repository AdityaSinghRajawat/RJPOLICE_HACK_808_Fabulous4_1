"use client";

import CaseForm from '@/components/CaseForm'
import Sidebar from '@/components/Sidebar';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const caseId = searchParams.get('id');

    const [errors, setErrors] = useState({});
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

    useEffect(() => {

        const getCaseDetails = async () => {
            const response = await fetch(`/api/policecase/${caseId}`,);
            const data = await response.json();

            setFormData({
                caseNumber: data.caseNumber,
                reportedBy: data.reportedBy,
                dateReported: data.dateReported,
                incidentType: data.incidentType,
                longitude: data.location.coordinates[0],
                latitude: data.location.coordinates[1],
                description: data.description,
                status: data.status,
                assignedOfficer: data.assignedOfficer,
                evidence: data.evidence,
            })
        }

        if (caseId) getCaseDetails();

    }, [caseId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const updateCase = async (e) => {
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

        if (!caseId) return alert('Case ID not found');

        try {

            const response = await fetch(`/api/policecase/${caseId}`, {
                method: 'PATCH',

                body: JSON.stringify({
                    caseNumber: formData.caseNumber,
                    reportedBy: formData.reportedBy,
                    dateReported: formData.dateReported,
                    incidentType: formData.incidentType,
                    longitude: formData.longitude,
                    latitude: formData.latitude,
                    description: formData.description,
                    status: formData.status,
                    assignedOfficer: formData.assignedOfficer,
                    evidence: formData.evidence,
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Police case Updated:', data);
                router.push('/cases');
            }

            console.log('Form submitted:', formData);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

            <div className="h-full hidden md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>

            <CaseForm
                handleChange={handleChange}
                handleSubmit={updateCase}
                formData={formData}
                errors={errors}
            />
        </div>
    )
}

export default page
