import {I18n, TranslateOptions} from 'i18n-js';
import {I18nManager} from 'react-native';
import * as Localization from 'react-native-localize';

// if English isn't your default language, move Translations to the appropriate language file.
import en, {Translations} from './en';
import ar from './ar';
import ko from './ko';

const translations = {
  ar,
  en,
  'en-US': en,
  ko,
};
const fallBackLanguage = {languageTag: 'en', isRTL: false};

const {languageTag, isRTL} =
  Localization.findBestAvailableLanguage(Object.keys(translations)) ??
  fallBackLanguage;

const i18n = new I18n(translations);
i18n.enableFallback = true;
/**
 * we need always include "*-US" for some valid language codes because when you change the system language,
 * the language code is the suffixed with "-US". i.e. if a device is set to English ("en"),
 * if you change to another language and then return to English language code is now "en-US".
 */
i18n.translations = translations;

i18n.locale = languageTag;

// handle RTL languages
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>;

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;

export function translate(key: TxKeyPath, options?: TranslateOptions) {
  return i18n.t(key, options);
}
