export enum TodoAction {
    CHANGE_LANGUAGE = '@@language/CHANGE_LANGUAGE',
}

export interface LanguageState {
    readonly language: string;
}
