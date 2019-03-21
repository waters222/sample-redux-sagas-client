const asyncTimeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

let fakeSession: string | undefined;

const fakeLogin = async (name: string, password: string) => {
    await asyncTimeout(1500);
    if (name === 'admin' && password === 'admin') {
        fakeSession = `fake_session_${Date.now()}`;
    } else {
        throw new Error('user name & password not match');
    }
    return fakeSession;
};

const fakeLogout = async () => {
    await asyncTimeout(1500);
    if (fakeSession !== undefined) {
        fakeSession = undefined;
    }
};
export { fakeLogin, fakeLogout };
