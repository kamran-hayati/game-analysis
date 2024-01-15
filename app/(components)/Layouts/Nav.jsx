'use client';

import Link from "next/link";

import LoginForm from "@/app/(components)/forms/LoginForm";
import StaticLinks from "@/app/(components)/Layouts/StaticLinks";
import Image from "next/image";

function Nav(props) {

    return (
        <nav
            className={`bg-lime-900 text-green-200 border-green-950 border-2
            bg-gradient-radial from-lime-950 via-10% to-lime-700 shadow-gray-300 
            justify-between p-2 m-1 mb-0 grid grid-cols-3`}
        >
            <div
                className='min-w-full m-auto'
            >
                <Link href='/' passHref={true} className="mr-0">
                    <Image
                        className="m-auto ml-2 text-center content-center items-center"
                        src='/img/game_controller_480px.png'
                        alt='Game Analysis!'
                        width={150}
                        height={150}
                    />
                </Link>
            </div>
            <StaticLinks />
            <LoginForm />
        </nav>
    );
}

export default Nav;