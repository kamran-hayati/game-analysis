'use client';

import React, {Context, Consumer} from "react";

import Nav from "@/app/(components)/Layouts/Nav";
import "./globals.css";
import 'semantic-ui-css/semantic.min.css'
import Footer from "@/app/(components)/Layouts/Footer";
import {Inter} from "next/font/google";

// import {cookies} from "next/headers";
import Cookie from "js-cookie";
import {compareTime, str2time} from "@/app/api/util/date-time";
import {GameAnalysisProvider} from "@/app/GameAnalysisProviders";

export function getAndSetMyCredentials() {
    // const Cookie = cookies();
    const expiresAt = str2time(Cookie.get('expiresAt'));
    const now = new Date().getTime();
    const token = Cookie.get('token');
    const username = Cookie.get('username');
    console.debug({getAndSetMyCredentials: {token, now, expiresAt, compareTime: compareTime(now, expiresAt)}})

    return {token, username, expiresAt};
}


const inter = Inter({subsets: ["latin"]});

const metadata = {
    title: "game-analysis",
    description: "IUST Fall 2023",
};

export default function RootLayout({children}) {
    const {token, username, expiresAt} = getAndSetMyCredentials();

    return (
        <GameAnalysisProvider>
            <html lang="en">
            <body className={inter.className}>
            <div
                className="flex flex-col h-screen max-h-screen p-1"
                style={{minWidth: "745px"}}
            >
                <Nav token={token} username={username}/>
                <div
                    className="min-w-fit  flex-grow bg-page text-default-text
                bg-gradient-to-br from-green-300 via-10% to-gray-300 p-2"
                    style={{minWidth: "360px"}}
                >
                    {children}
                </div>
                <Footer year={new Date().getFullYear()} token={token} username={username}/>
            </div>
            </body>
            </html>
        </GameAnalysisProvider>
    );
}
