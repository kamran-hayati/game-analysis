'use client';

import Link from "next/link";

import LoginForm from "@/app/(components)/forms/LoginForm";

function Nav() {

    return (
        <nav
            className='p-2 m-1 mb-0 bg-lime-900 text-green-200 border-green-950 border-2 bg-gradient-radial from-lime-950 via-10% to-lime-700 flex flex-row justify-between shadow-gray-300'>
            <div
                className='font-bold text-yellow-400 hover:text-yellow-600 flex'
            >
                <Link href='/' passHref={true}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src='/img/game_controller_480px.png'
                        alt='Game Analysis!'
                        width={75}
                        height={75}
                    />
                </Link>
            </div>
            <LoginForm className=''/>
        </nav>
    );
}

export default Nav;