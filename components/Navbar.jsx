
"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div>
      <nav className="flex flex-col md:flex-row justify-between p-4 md:p-8 items-center bg-blue-500 text-white">
        {/* Logo and Brand Section */}
        <div className="flex gap-2 md:gap-4 mb-4 md:mb-0 items-center">
          <Image
            src="/emblem.png"
            alt="Emblem"
            width={30}
            height={30}
            className="object-contain"
          />
          <Link href="/" className="flex gap-1 md:gap-2 items-center">
            <Image
              src="/rjpolicelogo.png"
              alt="Rajasthan Police Logo"
              width={30}
              height={30}
              className="object-contain"
            />
            <p className="logo_text text-xs md:text-base">Raj Police</p>
          </Link>
        </div>

        {/* Navigation Section */}

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          <Link href="/">
            <ul>
              <li className="mb-2 md:mb-0 text-sm hover:text-gray-300 transition duration-300">Home</li>
            </ul>
          </Link>
          <Link href="/dashboard">
            <ul>
              <li className="mb-2 md:mb-0 text-sm hover:text-gray-300 transition duration-300">Dashboard</li>
            </ul>
          </Link>

          {/* Authentication Section */}
          {session ? (
            <span className="cursor-pointer text-sm hover:text-gray-300 transition duration-300" onClick={() => signOut()}>
              Logout
            </span>
          ) : (
            <Link href="/api/auth/signin" className="text-sm hover:text-gray-300 transition duration-300">Login</Link>
          )}

          {session && (
            <Avatar>
              <AvatarImage
                src={session?.user?.image || "/user.png"}
                alt="User Avatar"
              />
              <AvatarFallback>USER</AvatarFallback>
            </Avatar>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;













// "use client"

// import { useSession, signOut } from "next-auth/react"
// import Image from "next/image"
// import Link from "next/link"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


// const Navbar = () => {
//   const { data: session } = useSession()

//   return (
//     <div>
//       <ul className="flex justify-between m-8 item-center ">
//         <div className="flex gap-10">
//           <Image
//             src="/emblem.png"
//             alt="Emblem"
//             width={40}
//             height={40}
//             className="object-contain"
//           />

//           <Link href="/" className="flex gap-3 flex-center items-center">
//             <Image
//               src="/rjpolicelogo.png"
//               alt="Rajasthan Police Logo"
//               width={40}
//               height={40}
//               className="object-contain"
//             />
//             <p className="logo_text">Rajasthan Police</p>
//           </Link>
//         </div>
//         <div className="flex gap-10 ">
//           <Link href="/">
//             <li>Home</li>
//           </Link>

//           <Link href="/dashboard">
//             <li>Dashboard</li>
//           </Link>

//           {session ? (

//             <span className="cursor-pointer" onClick={() => signOut()}>
//               Logout
//             </span>

//           ) : (
//             <Link href="/api/auth/signin">Login</Link>
//           )}

//           {session &&
//             <Avatar>
//               <AvatarImage src={session?.user?.image || '/user.png'} />
//               <AvatarFallback>USER</AvatarFallback>
//             </Avatar>
//           }


//         </div>
//       </ul>
//     </div>
//   )
// }

// export default Navbar
