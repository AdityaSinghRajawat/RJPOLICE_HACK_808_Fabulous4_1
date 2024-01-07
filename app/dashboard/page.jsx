"use client"

import Image from "next/image"
import { useSession } from "next-auth/react"
import Sidebar from "@/components/Sidebar"

const page = () => {
  const { data: session } = useSession()
  // console.log(session)

  return (
    <div>
      {/* <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.image}</p>
      <p>{session?.user?.id}</p> */}
      <div className="h-full hidden md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
    </div>
  )
}

export default page;
