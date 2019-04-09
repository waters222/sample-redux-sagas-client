import { AccountInfo } from '../stores/account/types';

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
    NETWORK_ERROR = 'network error',
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

const fakeUpdateInfo = async (email: string, phone: string) => {
    sessionStorage.setItem(
        'account_info',
        JSON.stringify({ email: email, phone: phone })
    );
    await asyncTimeout(1000);
};

const fakeGetInfo = async (): Promise<AccountInfo> => {
    const temp = sessionStorage.getItem('account_info');
    const ret = {
        email: '',
        phone: '',
    };
    if (temp !== null) {
        try {
            const { email, phone } = JSON.parse(temp);
            if (email) {
                ret.email = email;
            }
            if (phone) {
                ret.phone = phone;
            }
        } catch (err) {
            throw new ErrorAjax(ErrorAjaxType.NETWORK_ERROR);
        }
    }
    await asyncTimeout(1000);
    return ret;
};

let fakeAddtoDoIfSucc = false;
const fakeAddTodo = async () => {
    if (fakeAddtoDoIfSucc) {
        fakeAddtoDoIfSucc = !ErrorAjaxType.NETWORK_ERROR;
        await asyncTimeout(1000);
        return true;
    } else {
        await asyncTimeout(300);
        fakeAddtoDoIfSucc = !ErrorAjaxType.NETWORK_ERROR;
        throw new ErrorAjax(ErrorAjaxType.NETWORK_ERROR);
    }
};
export {
    fakeLogin,
    fakeLogout,
    fakeUpdateInfo,
    fakeGetInfo,
    fakeAddTodo,
    ErrorAjax,
};
