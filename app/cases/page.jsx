"use client";

import CaseCard from '@/components/CaseCard';
import Sidebar from '@/components/Sidebar'
import React, { useState, useEffect } from 'react'

const page = () => {

    const [cases, setcases] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch('/api/policecase');
            const data = await response.json();

            setcases(data);
        }

        fetchPosts();

    }, [])

    const CaseData = {
        caseNumber: '123',
        reportedBy: 'John Doe',
        dateReported: '2023-01-01',
        incidentType: 'Theft',
        status: 'Pending',
        latitude: '40.7128',
        longitude: '-74.0060',
        description: 'Description of the incident...',
        assignedOfficer: 'Officer Smith',
        evidence: 'Photo link or details',
    };

    return (
        <>
            <div className="h-full hidden md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>
            {cases.map((cas) => (
                <CaseCard cas={cas} key={cas._id} />
            ))}
        </>
    )
}

export default page
