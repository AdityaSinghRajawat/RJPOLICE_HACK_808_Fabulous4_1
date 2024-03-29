"use client";

import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {

  const { data: session } = useSession()

  return (
    <div className='mt-20'>
      <h1>Home Page</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.image}</p>
      <p>{session?.user?.id}</p>
    </div>
  )
}

export default page
