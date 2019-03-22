import * as Cookies from 'es-cookie';

export enum Cookie {
    Language = 'cookie/language',
    Session = 'cookie/session',
}

// for language setting
const getLangCookie = (): string => {
    const language = Cookies.get(Cookie.Language);
    return language !== undefined
        ? language
        : (navigator.languages && navigator.languages[0]) || navigator.language;
};

const storeLangCookie = (lang: string) => {
    Cookies.set(Cookie.Language, lang);
};

//  for session
export interface SessionCookieType {
    name: string;
    session: string;
}

const getSessionCookie = (): SessionCookieType | undefined => {
    const sessionCookie = Cookies.get(Cookie.Session);
    if (sessionCookie !== undefined) {
        try {
            const sessionObject = JSON.parse(sessionCookie);

            // make sure both field is not empty
            if (
                sessionObject.name !== undefined &&
                sessionObject.name !== '' &&
                sessionObject.session !== undefined &&
                sessionObject.session !== ''
            ) {
                return {
                    name: sessionObject.name,
                    session: sessionObject.session,
                };
            }
        } catch (err) {
            console.log(
                `[ERROR] parse session cookie object failed: ${err.message}`
            );
        }
    }
    return undefined;
};

const storeSessionCookie = (name: string, session: string): boolean => {
    try {
        Cookies.set(
            Cookie.Session,
            JSON.stringify({ name: name, session: session })
        );
        return true;
    } catch (err) {
        console.log(`[ERROR] store session into cookie failed: ${err.message}`);
        return false;
    }
};

const clearSessionCookie = (): boolean => {
    try {
        Cookies.remove(Cookie.Session);
        return true;
    } catch (err) {
        console.log(`[ERROR] clear session into cookie failed: ${err.message}`);
        return false;
    }
};

export {
    getSessionCookie,
    storeSessionCookie,
    clearSessionCookie,
    getLangCookie,
    storeLangCookie,
};
