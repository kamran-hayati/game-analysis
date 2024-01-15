'use client';

import React, {useState} from 'react';
import LogoutForm from "@/app/(components)/forms/LogoutForm";
import authUser from "@/app/api/publicRoutes/auth";
import {Popup, PopupContent, PopupHeader} from "semantic-ui-react";
import {useGameAnalysisAppContext} from "@/app/GameAnalysisProviders";
import Cookie from "js-cookie";


export default function LoginForm(props) {
    const ctx = useGameAnalysisAppContext();
    const [username, setUsername] = useState(ctx.username || Cookie.get('username'));
    const [error, setError] = useState(null);

    function onSubmit(e) {
        e.preventDefault();
        const identifier = e.target.identifier.value;
        const password = e.target.password.value;

        authUser({identifier, password}, setUsername, setError);
    }

    function userProfile(e) {
        e.preventDefault();
        console.log({userProfile: `window.location = '/profile/me'`});
    }

    if (!username) {
        const inpClass = 'bg-lime-300 border border-2 border-emerald-950 mx-2 p-2 h-10 w-30 focus:border-yellow-600';
        const btnClass = 'border border-emerald-950 mx-2 p-2 h-10 w-30 hover:bg-lime-300 hover:border-yellow-600';

        return (<div className="min-w-full m-auto">
            <form
                className='align-middle py-6 float-right text-center grid grid-cols-1'
                onSubmit={onSubmit}
                style={{color: "darkblue"}}
            >
                <input type='email'
                       required={true}
                       className={inpClass}
                       placeholder='email@emample.com'
                       name='identifier'
                       aria-errormessage={'This is an email field and should have been met email condition'}
                />
                <input
                    type='password'
                    required={true}
                    placeholder='password'
                    className={inpClass}
                    name='password'
                />
                <button
                    type='submit'
                    // onClick={e => e.preventDefault()}
                    className={btnClass}
                >Login
                </button>
            </form>
        </div>)
    } else if (error && typeof error === "string") {
        return <div id='login-error' className="bg-yellow-300 text-red-950 font-bold">
            <Popup>
                <PopupHeader>Login Error</PopupHeader>
                <PopupContent>{error}</PopupContent>
            </Popup>
        </div>
    } else {
        return (<div className='align-middle float-right items-center content-center text-center min-w-full my-auto'>
            <div className='font-bold text-yellow-300 m-auto'>
                <em className='font-extrabold cursor-pointer' onClick={userProfile}>{username}</em>
            </div>
            <hr/>
            <LogoutForm setUsername={setUsername}/>
        </div>);
    }
}