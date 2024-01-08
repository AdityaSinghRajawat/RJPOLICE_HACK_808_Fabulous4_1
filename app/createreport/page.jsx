import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="h-full hidden md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>
            create report
        </div>
    )
}

export default page
