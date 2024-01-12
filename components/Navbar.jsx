"use client";

import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileSidebar from './MobileSidebar';

const Navbar = () => {

    const [toggle, setToggle] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <nav className={`sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>

            {pathname != "/" && pathname != "/login" &&
                <div className='mr-3'>
                    <MobileSidebar />
                </div>
            }

            <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>

                <Link
                    href='/'
                    className='flex items-center gap-2'
                >
                    <Image
                        src='/rjpolicelogo.png'
                        alt='logo'
                        className='object-contain'
                        width={30}
                        height={30}
                    />
                    <p className='text-white text-[18px] font-bold cursor-pointer flex'>CyberJustice</p>
                </Link>

                <ul className='list-none hidden sm:flex flex-row gap-10'>

                    <Link href='/'>
                        <li
                            className={`${pathname === '/' ? 'text-white' : 'text-secondary'} hover:text-white text-[18px] font-medium cursor-pointer`}
                        >
                            Home
                        </li>
                    </Link>
                    {session &&
                        <Link href='/dashboard'>
                            <li
                                className={`${pathname === '/dashboard' ? 'text-white' : 'text-secondary'} hover:text-white text-[18px] font-medium cursor-pointer`}
                            >
                                Dashboard
                            </li>
                        </Link>
                    }

                    {session ? (
                        <li
                            className={`${pathname === '/login' ? 'text-white' : 'text-secondary'} hover:text-white text-[18px] font-medium cursor-pointer`}
                            onClick={() => signOut()}
                        >
                            Logout
                        </li>

                    ) : (
                        <Link href='/api/auth/signin'>
                            <li
                                className={`${pathname === '/login' ? 'text-white' : 'text-secondary'} hover:text-white text-[18px] font-medium cursor-pointer`}
                            >
                                Login
                            </li>
                        </Link>
                    )}

                    {session &&
                        <li
                            className='flex items-center gap-2'
                        >
                            <Image
                                src={session?.user?.image || '/user.png'}
                                alt='user'
                                className='object-contain rounded-full'
                                width={30}
                                height={30}
                            />
                            <p className='text-white text-[18px] font-bold cursor-pointer flex'>{session?.user.name}</p>
                        </li>
                    }

                </ul>

                <div className='sm:hidden flex flex-1 justify-end items-center'>
                    <Image
                        src={toggle ? '/close.svg' : '/menu.svg'}
                        alt='menu'
                        width={25}
                        height={25}
                        className='object-contain cursor-pointer'
                        onClick={() => setToggle(!toggle)}
                    />

                    <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient bg-slate-900 absolute top-20 right-0 mx-4 my-2 min-w[140px] z-10 rounded-xl`}>
                        <ul className='list-none flex justify-end items-start flex-col gap-4 '>

                            <Link href='/' >
                                <li
                                    className={`${pathname === '/' ? 'text-white' : 'text-secondary'} font-poppins font-medium cursor-pointer text-[16px]`}
                                    onClick={() => {
                                        setToggle(!toggle);
                                    }}
                                >
                                    Home
                                </li>
                            </Link>
                            {session &&
                                <Link href='/dashboard' >
                                    <li
                                        className={`${pathname === '/dashboard' ? 'text-white' : 'text-secondary'} font-poppins font-medium cursor-pointer text-[16px]`}
                                        onClick={() => {
                                            setToggle(!toggle);
                                        }}
                                    >
                                        Dashboard
                                    </li>
                                </Link>
                            }

                            {session ? (
                                <li
                                    className={`${pathname === '/login' ? 'text-white' : 'text-secondary'} font-poppins font-medium cursor-pointer text-[16px]`}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        signOut();
                                    }}
                                >
                                    Logout
                                </li>

                            ) : (
                                <Link href='/api/auth/signin'>
                                    <li
                                        className={`${pathname === '/login' ? 'text-white' : 'text-secondary'} font-poppins font-medium cursor-pointer text-[16px]`}
                                        onClick={() => {
                                            setToggle(!toggle);
                                        }}
                                    >
                                        Login
                                    </li>
                                </Link>
                            )}

                            {session &&
                                <li
                                    className='flex items-center gap-2'
                                >
                                    <Image
                                        src={session?.user?.image || '/user.png'}
                                        alt='user'
                                        className='object-contain rounded-full'
                                        width={30}
                                        height={30}
                                    />
                                    <p className='text-white text-[18px] font-bold cursor-pointer flex'>{session?.user.name}</p>
                                </li>
                            }

                        </ul>
                    </div>

                </div>

            </div>
        </nav >
    )
}

export default Navbar;
