'use client';

import React from 'react';
import Link from "next/link";
import {getMyToken} from "@/app/api/publicRoutes/auth";
import {useGameAnalysisAppContext} from "@/app/GameAnalysisProviders";

function StaticLinks(props) {
    const {username, token} = useGameAnalysisAppContext();
    const footerLinks = ['Blog', 'Interview', 'About', 'FAQ', `${token ? 'Logout' : "Register"}`];

    return (
        <div className="min-w-max m-auto">
            <ul className={`min-w-fit m-5 p-2 text-center grid-cols-3 grid`}>
                {footerLinks.map((l, i) => (<li key={i} className="min-w-fit ">
                    <Link href={`/${l.toLowerCase()}`}>{l}</Link></li>)
                )}
            </ul>
        </div>
    );
}

export default StaticLinks;