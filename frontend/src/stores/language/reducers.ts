import { LanguageActionType, LanguageState } from './types';
import { Reducer } from 'redux';
import * as Cookies from 'es-cookie';
import { Cookie } from '../../constants/cookie';
import { ResolveLanguage } from '../../utils/language-helpers';

export const DefaultLanguage = 'en_US';

const initialState: LanguageState = {
    language: DefaultLanguage,
};

const reducer: Reducer<LanguageState> = (state = initialState, action) => {
    if (action.type === LanguageActionType.CHANGE_LANGUAGE) {
        const language = ResolveLanguage(action.payload);
        // lets save the cookie
        if (state.language !== language) {
            Cookies.set(Cookie.Language, language);
            return { language: language };
        }
        return state;
    } else {
        return state;
    }
};

export { reducer as lanReducer };
