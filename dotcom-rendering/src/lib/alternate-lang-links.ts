import { editionList, getEditionFromPageId, isNetworkFront } from './edition';

const linkTemplate = (baseUrl: string, pageId: string, lang: string): string =>
	`<link rel="alternate" href="${baseUrl}/${pageId}" hreflang="${lang}" />`;

const createAlternateLangLinks = (
	baseUrl: string,
	pageId: string,
): string[] => {
	if (isNetworkFront(pageId)) {
		const hasLangLocale = !!getEditionFromPageId(pageId)?.langLocale;
		if (hasLangLocale) {
			return editionList.reduce<string[]>((acc, edition) => {
				if (edition.langLocale) {
					return [
						...acc,
						linkTemplate(
							baseUrl,
							edition.pageId,
							edition.langLocale,
						),
					];
				}
				return acc;
			}, []);
		}
	}
	return [];
};

export { createAlternateLangLinks };
