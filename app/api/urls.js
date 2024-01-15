const STRAPI_API = process.env.STRAPI_API_PATH || 'api'
const STRAPI_BASE = process.env.STRAPI_BASE_URL || 'http://127.0.0.1:1337'

export const API_URL = `${STRAPI_BASE}/${STRAPI_API}`

/**
 * By default, create a token with authorization role and content-type, however,
 * it accepts options if it's desired.
 * @param token
 * @param options an object indicating headers' hey-value pairs.
 * @returns [[key: string]: [string:string]]  key-value pairs' hash table indicating headers.
 */
export function mkHeaders(token, options = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
}) {
    const h = ({Authorization: options.Authorization || token, Accept: options.Accept})
    for (let k in options) {
        h[k] = options[k];
    }
    return h;
}

const HTTP_VERB = {GET: "GET", POST: "POST", UPDATE: "PUT", DELETE: "DELETE"}

function mkResource(path, method, {id = undefined, parameters = []}) {
    const couple = (p) => p.length === 2 ? `${p[0]}=${p[1]}` : '';
    const params = parameters
        .map(p => `${Array.isArray(p) ? couple(p) : couple([p.key, p.value])}`)
        .filter(p => p.length > 0)
        .join("&");
    if (typeof path !== 'string') throw new Error("`path` in url must be a not-empty string")
    const normalizedPath = () => path.length === 0 ? '' : path.charAt(0) === '/'
        ?
        path.substring(1)
        :
        `${path}${id && method.toLowerCase() !== 'get' && method.toLowerCase() !== 'post' ? ('/' + id) : ''}?${params}`;
    return {
        url: () => `${API_URL}/${normalizedPath()}`,
        method: HTTP_VERB[method.toUpperCase()]
    }
}

export function resources(resource, {keys = [], parameters = []}) {
    const r = ({
        index: mkResource(resource, 'get', {withID: false, parameters}),
        create: mkResource(resource, 'post', {withID: false, parameters}),
        view: mkResource(resource, 'view', {withID: true, parameters}),
        update: mkResource(resource, 'update', {withID: true, parameters}),
        delete: mkResource(resource, 'delete', {withID: true, parameters})
    })
    return Array.isArray(keys) && keys.length > 0 ? keys.map(k => r[k]) : typeof keys === "string" ? r[keys] : r;
}

export const FRONTEND_BASE = process.env.FRONTEND_BASE || 'http://127.0.0.1:3000';