import { LanguageActionType, LanguageState } from './types';
import { Reducer } from 'redux';
import { storeLangCookie } from '../../constants/cookie';
import { ResolveLanguage } from '../../utils/language-helpers';

export const DefaultLanguage = 'en_US';

const initialState: LanguageState = {
    language: DefaultLanguage,
};

const reducer: Reducer<LanguageState> = (state = initialState, action) => {
    if (action.type === LanguageActionType.CHANGE_LANGUAGE) {
        const { lang } = action.payload;
        const language = ResolveLanguage(lang);
        // lets save the cookie
        console.log(`change lang from ${state.language} to ${language}`);
        if (state.language !== language) {
            storeLangCookie(language);
            location.reload();
        }
    }
    return state;
};

export { reducer as lanReducer };
