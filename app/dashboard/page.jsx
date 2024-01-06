"use client"

import Image from "next/image"
import { useSession } from "next-auth/react"

const page = () => {
  const { data: session } = useSession()
  console.log(session)

  return (
    <div>
      dashboard
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.image}</p>
      <p>{session?.user?.id}</p>

      <Image
        src={
          session?.user.image || "/user.png"
        }
        height={50}
        width={50}
        alt="user profile"
      />
    </div>
  )
}

export default page;
