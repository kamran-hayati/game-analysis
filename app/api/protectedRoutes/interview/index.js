'use client';

import Cookie from "js-cookie";
import {resources} from "@/app/api/urls";

export function abstractFetch({ctx = ctx, setLoading, setErrors, setData, resourceName, atr = []}) {
    const token = ctx.token || Cookie.get('token');
    const username = ctx.username || Cookie.get('token');
    const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
    setLoading(true);
    setErrors(null);
    console.debug({AbstractPageUsingToken: {token, username}})
    const parameters = [['populate', '*'], ['fields', '*']]
    const extractErrors = (error) => {
        const err = [];
        if ('message' in error) {
            err.push(`message:\t${error.message}`)
        }
        if ('name' in error) {
            err.push(`name:\t${error.name}`)
        }
        if ('status' in error) {
            err.push(`status:\t${error.status}`)
        }
        return err;
    }
    const resource = resources(resourceName, {parameters});
    const {url, method} = resource.index;

    console.debug({url: url(), method, parameters})

    fetch(url(), {
        headers, method
    })
        .then(inter => inter.json())
        .then(res => {
            setLoading(false);
            if (res.error) {
                console.log({ErrorFound: res.error});
                setErrors(extractErrors(res.error));
                return
            }
            const data = res.data.map(d => ({
                id: d.id,
                attributes: atr.length > 0 ? atr.map(k => d.attributes[k]) : d.attributes
            }))
            setData(data)
            console.log({AbstractPageFetching: {resourceName, data}});
        })
        .catch(error => {
            setErrors(extractErrors(error));
            setLoading(false);
            console.error({ErrorCatch: (error.message)});
        });
}