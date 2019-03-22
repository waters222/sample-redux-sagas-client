import { addLocaleData } from 'react-intl';
import { Locale } from 'antd/lib/locale-provider';
import { DefaultLanguage } from '../stores/language/reducers';

import * as en from 'react-intl/locale-data/en';
import enUS from 'antd/lib/locale-provider/en_US';
import enUSMessages from '../locales/en_US.json';

import * as zh from 'react-intl/locale-data/zh';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import zhCNMessages from '../locales/zh_CN.json';

export interface LanguageTypes {
    key: string;
    name: string;
}

export const Languages = [
    {
        key: 'zh_CN',
        name: 'lang_chinese',
    },
    {
        key: 'en_US',
        name: 'lang_english',
    },
];

export interface LanguageSetting {
    readonly languageWithoutRegionCode: string;
    readonly messages: object;
    readonly locale: Locale;
}

export function getLanguageWithoutRegionCode(language: string) {
    return language.toLowerCase().split(/[_-]+/)[0];
}

export function ResolveLanguage(name: string): string {
    name = name.replace('-', '_');
    switch (name) {
        case 'zh_CN':
            return name;
        default:
            return DefaultLanguage;
    }
}

export function getLanguageSetting(language: string): LanguageSetting {
    language = ResolveLanguage(language);
    // default en_US no need to add language
    switch (language) {
        case 'zh_CN': {
            addLocaleData(zh);
            return {
                languageWithoutRegionCode: getLanguageWithoutRegionCode(
                    language
                ),
                locale: zhCN,
                messages: zhCNMessages,
            };
        }
        default: {
            addLocaleData(en);
            return {
                languageWithoutRegionCode: getLanguageWithoutRegionCode(
                    DefaultLanguage
                ),
                locale: enUS,
                messages: enUSMessages,
            };
        }
    }
}
