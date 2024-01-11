"use client";

import CaseCard from '@/components/CaseCard';
import Sidebar from '@/components/Sidebar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

const CaseCardList = ({ data, handleDelete, handleEdit }) => {

    return (
        <div>
            {data.map((cas) => (
                <CaseCard
                    cas={cas}
                    key={cas._id}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            ))}
        </div>
    )
}

const page = () => {

    const [cases, setCases] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const router = useRouter();
    const { data: session } = useSession();

    if (!session) {
        redirect('/')
    }

    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch('/api/policecase');
            const data = await response.json();

            setCases(data);
        }

        fetchPosts();

    }, []);

    const filterCases = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return cases.filter(
            (item) =>
                regex.test(item.status)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterCases(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

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

                setCases(filteredPosts);

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
            <div className='grid justify-items-center'>

                <form className='mb-10'>
                    <select
                        id="status"
                        name="status"
                        value={searchText}
                        onChange={handleSearchChange}
                        className="block appearance-none w-full p-2 pr-8 border rounded-md bg-white border-gray-300 focus:outline-none focus:border-black-500"
                    >
                        <option value="">All Cases</option>
                        <option value="Pending">Pending</option>
                        <option value="Investigating">Investigating</option>
                        <option value="Closed">Closed</option>
                    </select>
                </form>

                {searchText ? (
                    <CaseCardList
                        data={searchedResults}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                ) : (
                    <CaseCardList
                        data={cases}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                )}
            </div>
        </>
    )
}

export default page
