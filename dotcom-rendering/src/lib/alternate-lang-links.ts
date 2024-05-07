import {
	editionList,
	getEditionFromPageId,
	isNetworkFront,
	splitEditionalisedPage,
} from './edition';

const linkTemplate = (baseUrl: string, pageId: string, lang: string): string =>
	`<link rel="alternate" href="${baseUrl}/${pageId}" hreflang="${lang}" />`;

const createAlternateLangLinks = (
	baseUrl: string,
	pageId: string,
): string[] => {
	if (isNetworkFront(pageId)) {
		const pageEdition = getEditionFromPageId(pageId);
		const hasLangLocale = pageEdition?.langLocale;
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
	const parsedEditionalisedPage = splitEditionalisedPage(pageId);
	const isEditionalisedPage = parsedEditionalisedPage !== undefined;
	if (isEditionalisedPage) {
		const [networkId, pageIdSuffix] = parsedEditionalisedPage;
		const pageEdition = getEditionFromPageId(networkId);
		const hasLangLocale = pageEdition?.langLocale;
		const hasEditionalisedPages = pageEdition?.hasEditionalisedPages;
		if (hasLangLocale && hasEditionalisedPages) {
			return editionList.reduce<string[]>((acc, edition) => {
				if (edition.langLocale && edition.hasEditionalisedPages) {
					return [
						...acc,
						linkTemplate(
							baseUrl,
							`${edition.pageId}/${pageIdSuffix}`,
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
