const STRAPI_API = '/api'
const STRAPI_BASE = "http://localhost:1337"

export const API_URL = (process.env.STRAPI_BASE + process.env.STRAPI_API) || (STRAPI_BASE + STRAPI_API)

/**
 * By default, create a token with authorization role and content-type, however,
 * it accepts options if it's desired.
 * @param token
 * @param options an object indicating headers' hey-value pairs.
 * @returns {{Authorization: string, Accept: string}}   as expected default headers along with optionals.
 */
export function mkHeaders(token, options = {
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    Accept: 'application/json'
}) {
    const h = ({Authorization: options.Authorization || token, Accept: options.Accept})
    for (let k in options) {
        h[k] = options[k];
    }
    return h;
}

export function resources(resource) {
    return ({
        index: () => `${API_URL}/${resource}`,
        create: () => `${API_URL}/${resource}`,
        view: (id) => `${API_URL}/${resource}/id`,
        update: (id) => `${API_URL}/${resource}/id`,
        delete: (id) => `${API_URL}/${resource}/id`
    })
}
