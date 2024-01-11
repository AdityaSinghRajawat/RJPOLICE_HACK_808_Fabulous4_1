"use client";

import CaseCard from '@/components/CaseCard';
import Sidebar from '@/components/Sidebar'
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

const page = () => {

    const [cases, setcases] = useState([]);
    const router = useRouter();
    const { data: session } = useSession();

    if (!session) {
        redirect('/')
    }

    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch('/api/policecase');
            const data = await response.json();

            setcases(data);
        }

        fetchPosts();

    }, []);

    const handleEdit = (post) => {
        router.push(`/updatecase?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this case?");

        if (hasConfirmed) {

            try {
                await fetch(`/api/policecase/${post._id.toString()}`, {
                    method: 'DELETE',
                });

                const filteredPosts = cases.filter((p) => p._id !== post._id);

                setPosts(filteredPosts);

            } catch (error) {
                console.log(error);
            }

        }
    }

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
                <CaseCard
                    cas={cas}
                    key={cas._id}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            ))}
        </>
    )
}

export default page
