'use client';

import {API_URL} from "@/app/api/urls";
import axios from "axios";
import {compareTime, str2time} from "@/app/api/util/date-time";
import Cookie from "js-cookie";

export default async function authUser({
                                           identifier,
                                           password
                                       },
                                       setUsername = (username) => console.log(`set username '${username}'`),
                                       setError = (e) => console.log(`set error '${e}'`)) {
    const {token, username} = getMyToken();
    if (token) {
        console.log({LazyFetch: token})
        return ({isValid: true, data: {token, username}});
    }
    const res = await axios(
        {url: `${API_URL}/auth/local`, data: {identifier, password}, method: 'POST'}
    ).catch(err => console.log({AuthenticationFailed: err}));
    const data = await res.data;
    if (data?.user.blocked) {
        const error = "User has been blocked temporarily. Contact admin if you believe this is a mistake!";
        setError(error);
        return {
            isValid: false, data: {error}
        };
    }

    Cookie.set('token', data?.jwt);
    Cookie.set('username', data?.user.email);
    const _7days = 7 * 24 * 60 * 60 * 1000;
    const seven = new Date(data?.user.createdAt).getTime() * _7days;
    Cookie.set('expiresAt', seven.toString());
    setUsername(data?.user.email);

    return ({isValid: true, data: {token: Cookie.get('token'), username: Cookie.get('username')}});
}

export function getMyToken() {
    const expiresAt = Cookie.get('expiresAt');
    const now = new Date().getTime();
    const token = Cookie.get('token');
    const username = Cookie.get('username');

    const isValid = expiresAt && new Date(expiresAt).getTime() - now > 0;

    return {token: isValid ? token : undefined, username: isValid ? username : undefined}
}