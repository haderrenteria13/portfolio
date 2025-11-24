import es from './es';
import en from './en';

export type Lang = 'es' | 'en';

export const languages: Lang[] = ['es', 'en'];
export const defaultLang: Lang = 'es';

const translations = {
	es,
	en,
} as const;

export function getTranslations(lang: Lang = defaultLang) {
	return translations[lang];
}

export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split('/');
	if (lang in translations) return lang as Lang;
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return getTranslations(lang);
}

