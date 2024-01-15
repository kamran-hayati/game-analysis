import { cookies } from 'next/headers'
import {loadGetInitialProps} from "next/dist/shared/lib/utils";

async function MainPage({ Component, pageProps, isLoggedIn, token }) {
    // const initProps = loadGetInitialProps(Component, pageProps);

    console.log({MainPage: {token,}})

    if (isLoggedIn) {
        return <Component {...pageProps} />
    } else {
        return <div>Please log in to access your dashboard.</div>
    }
}

MainPage.getInitialProps = async ({ req }) => {
    const cookieStore = cookies(req.headers.cookie);
    const token = cookieStore.get('token');

    console.log({req, reqHeader: req.headers, reqHeaderCookie: req.headers.cookie})
    if (token) {
        // Check if the token is valid and not expired
        // If the token is valid, set isLoggedIn to true
        const isLoggedIn = true
        return { isLoggedIn, token }
    } else {
        // If the token is not found, set isLoggedIn to false
        const isLoggedIn = false
        return { isLoggedIn, token }
    }
}

export default MainPage
