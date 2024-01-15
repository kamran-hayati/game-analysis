import {useState, createContext, useContext, useEffect} from "react";
import Cookie from "js-cookie";

export const mkAppContext = (locale, token, username, expiresAt) => ({locale, token, username, expiresAt});

const AppContext = createContext(mkAppContext('en_US', null, null, null));

export const GameAnalysisProvider = ({children}) => {
    const [locale, setLocale] = useState(null);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [expiresAt, setExpiresAt] = useState(null);
    const [retries, setRetries] = useState(0);

    const tryCookies = () => {
        const token = Cookie.get('token');
        const username = Cookie.get('username');
        const expiresAt = Cookie.get('expiresAt');
        setLocale(locale);
        setToken(token);
        setUsername(username);
        setExpiresAt(expiresAt);
    }

    useEffect(tryCookies, []);

    if (retries > 0) {
        setTimeout(() => {
            tryCookies();
            setRetries(retries - 1);
        }, 50);
    }

    return (
        <AppContext.Provider
            value={{
                token, setToken, username, setUsername, expiresAt, setExpiresAt, locale, setLocale, retries, setRetries
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGameAnalysisAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined)
        throw new Error("useAppContext must be used within an GameAnalysisProviders");
    return context;
};