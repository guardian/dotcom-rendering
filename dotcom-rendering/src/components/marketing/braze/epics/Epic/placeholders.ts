import { getCountryName, getLocalCurrencySymbol } from './geolocation';

const ALLOWED_PLACEHOLDERS = ['%%CURRENCY_SYMBOL%%', '%%COUNTRY_NAME%%'];

// we have to treat %%ARTICLE_COUNT%% placeholders specially as they are replaced
// with react components, not a simple text substitution
export const replaceNonArticleCountPlaceholders = (
	content: string | undefined,
	countryCode?: string,
): string => {
	if (!content) {
		return '';
	}

	content = content.replace(
		/%%CURRENCY_SYMBOL%%/g,
		getLocalCurrencySymbol(countryCode),
	);

	const countryName = getCountryName(countryCode) ?? '';
	content = countryName
		? content.replace(/%%COUNTRY_NAME%%/g, countryName)
		: content;

	return content;
};

// Nb. don't attempt to use lookbehind (?<!) here, as IE 11 will break alas
const PLACEHOLDER_RE = /%%.*?%%/g;
export const containsNonAllowedPlaceholder = (text: string): boolean => {
	const matches = text
		.match(PLACEHOLDER_RE)
		?.filter((str) => !ALLOWED_PLACEHOLDERS.includes(`${str}`));
	return !!matches && matches.length > 0;
};
