class ErrorAjax extends Error {
    public id: string;
    public message: string = '';
    constructor(id: string, message?: string) {
        super(message);
        this.id = id;
        if (message !== undefined) {
            this.message = message;
        }
    }
}

export enum ErrorAjaxType {
    INVALID_PASSWORD = 'ajax_invalid_password',
}

const asyncTimeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

let fakeSession: string | undefined;

const fakeLogin = async (name: string, password: string) => {
    await asyncTimeout(1500);
    if (name === 'admin' && password === 'admin') {
        fakeSession = `fake_session_${Date.now()}`;
    } else {
        throw new ErrorAjax(ErrorAjaxType.INVALID_PASSWORD);
    }
    return fakeSession;
};

const fakeLogout = async () => {
    await asyncTimeout(300);
    if (fakeSession !== undefined) {
        fakeSession = undefined;
    }
};
export { fakeLogin, fakeLogout, ErrorAjax };
