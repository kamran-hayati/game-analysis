'use client';

import React, {useState} from 'react';
import authUser from "@/app/api/strapi/publicRoutes/auth";

export default function LoginForm({className}) {
    const [username, setUsername] = useState(null);

    function onSubmit(e) {
        e.preventDefault();
        const identifier = e.target.identifier.value;
        const password = e.target.password.value;
        console.log({onSubmit: {identifier, password}})
        authUser({identifier, password}, setUsername);
    }

    function userProfile(e) {
        e.preventDefault();
        console.log({userProfile: `window.location = '/profile/me'`})
    }

    if (username === null) {
        return (<form
            className='align-middle py-6 float-right text-center'
            onSubmit={onSubmit}
            style={{color: "darkblue"}}
        >
            <input type='email'
                   required={true}
                   className='bg-lime-300 border-2 border-emerald-950 mx-2 p-2 h-10 w-30 focus:border-yellow-600'
                   placeholder='email@emample.com'
                   name='identifier'
                   aria-errormessage={'This is an email field and should have been met email condition'}
            />
            <input
                type='password'
                required={true}
                placeholder='password'
                className='bg-lime-300 border-2 border-emerald-950 mx-2 p-2 h-10 w-30'
                name='password'
            />
            <button
                type='submit'
                // onClick={e => e.preventDefault()}
                className='border-emerald-950'
            >Login</button>
        </form>)
    } else {
        return (<div className='align-middle py-6 float-right text-center'>
            <span className='font-bold text-yellow-300'>
                Welcome <em className='font-extrabold cursor-pointer' onClick={userProfile}>{username}</em>
            </span>
        </div>);
    }
}