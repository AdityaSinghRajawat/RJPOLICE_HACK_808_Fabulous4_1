"use client";
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import CaseForm from '@/components/CaseForm';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';


const PoliceCaseForm = () => {

    const { data: session } = useSession();
    const router = useRouter();

    if (session?.user?.role == "citizen") redirect("/");

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

        console.log(session?.user.id);
        const response = await fetch('/api/policecase/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // userId: session?.user.id,
                userEmail: session?.user.email,
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
            }),
        });


        if (response.ok) {
            const data = await response.json();
            router.push('/cases')
            console.log('Police case created:', data);
        } else {
            console.error('Error creating police case');
        }

        console.log('Form submitted:', formData);

    };

    return (
        <div className='mt-20'>
            <div className="h-full hidden md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>

            <CaseForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                errors={errors}
            />

        </div>
    );
};

export default PoliceCaseForm;
