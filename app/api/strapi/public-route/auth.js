import {API_URL} from "@/app/(config)/backend-urls";
import axios from "axios";

export default async function authUser({identifier, password}, setUsername) {
    let expiresAt = localStorage.getItem('expiresAt');
    if (expiresAt && new Date().getTime() - expiresAt > 0) {
        console.log({LazyFetch: localStorage.token})
        return ({token: localStorage.getItem('token'), username: localStorage.getItem('username')});
    }
    const res = await axios(
        {url: `${API_URL}/auth/local`, data: {identifier, password}, method: 'POST'}
    );
    const data = await res.data;
    console.log({authUserResponse: data})
    localStorage.setItem('token', data.jwt);
    localStorage.setItem('username', data?.user.email);
    const _7days = 7 * 24 * 60 * 60 * 1000;
    const seven = new Date(data?.user.createdAt).getTime() * _7days;
    localStorage.setItem('expiresAt', seven.toString());
    setUsername(data.user.email)
    return ({token: data.jwt, username: data.user.email, seven});
}