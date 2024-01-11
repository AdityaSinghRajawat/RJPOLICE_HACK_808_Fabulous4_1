"use client"

import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MobileSidebar from "./MobileSidebar"
import { usePathname } from "next/navigation"


const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();

    return (
        <div>

            <ul className="flex justify-between m-8 item-center ">
                <div className="flex gap-10">

                    {
                        pathname != "/" && <MobileSidebar />
                    }

                    <Image
                        src="/emblem.png"
                        alt="Emblem"
                        width={40}
                        height={40}
                        className="object-contain"
                    />

                    <Link href="/" className="flex gap-3 flex-center items-center">


                        <Image
                            src="/rjpolicelogo.png"
                            alt="Rajasthan Police Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                        <p className="logo_text">Rajasthan Police</p>
                    </Link>

                </div>
                <div className="flex gap-10 ">
                    <Link href="/">
                        <li>Home</li>
                    </Link>

                    {
                        session &&
                        <Link href="/dashboard">
                            <li>Dashboard</li>
                        </Link>
                    }

                    {session ? (

                        <span className="cursor-pointer" onClick={() => signOut()}>
                            <li>Logout</li>
                        </span>

                    ) : (
                        <Link href="/api/auth/signin">Login</Link>
                    )}

                    {session &&
                        <Avatar>
                            <AvatarImage src={session?.user?.image || '/user.png'} />
                            <AvatarFallback>USER</AvatarFallback>
                        </Avatar>
                    }


                </div>
            </ul>
        </div>
    )
}

export default Navbar
