import * as Cookies from 'es-cookie';

export enum Cookie {
    Language = 'cookie/language',
    Session = 'cookie/session',
}

export interface SessionCookieType {
    name: string;
    session: string;
}

const getSessionFromCookie = (): SessionCookieType | undefined => {
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

const storeSessionToCookie = (name: string, session: string) => {
    try {
        Cookies.set(
            Cookie.Session,
            JSON.stringify({ name: name, session: session })
        );
    } catch (err) {
        console.log(`[ERROR] store session into cookie failed: ${err.message}`);
    }
};

export { getSessionFromCookie, storeSessionToCookie };
