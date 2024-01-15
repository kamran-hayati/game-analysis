'use client';

import React, {useState} from 'react';
import Cookie from "js-cookie";
import {redirect} from "next/navigation";

function LogoutForm({setUsername}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function logout(e) {
        e.preventDefault();
        if (!error) {
            setTimeout(() => {
                setUsername(null);
                setLoading(false);
            }, 1000);
            setLoading(true);
            setError(null);
            Cookie.remove('token');
            Cookie.remove('expiresAt');
            Cookie.remove('username');
            const token = Cookie.get('token');
            const expiresAt = Cookie.get('expiresAt');
            const username = Cookie.get('username');
            const redirectURL = '/login';
            console.log({LogoutForm: {token, expiresAt, username, redirect: `to ${redirectURL}`}});
            redirect('/', 'push');
        }
    }

    if (loading)
        return <div className="border border-green-950 btn bg-red-300 w-3/4">Logging Out ...</div>
    if (error) {
        return <div className="text-red-950 border border-yellow-950 bg-yellow-200">
            Logout Error: {error.toString()}
        </div>
    } else {
        return <div>
            <button onClick={logout} className="border border-green-950 btn bg-red-300 w-3/4">Logout</button>
        </div>
    }
}

export default LogoutForm;