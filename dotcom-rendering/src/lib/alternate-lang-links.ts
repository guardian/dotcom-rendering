import type { Edition } from './edition';
import {
	editionList,
	getEditionFromPageId,
	isNetworkFront,
	splitEditionalisedPage,
} from './edition';

const linkTemplate = (baseUrl: string, pageId: string, lang: string): string =>
	`<link rel="alternate" href="${baseUrl}/${pageId}" hreflang="${lang}" />`;

const collectAlternateLangLinks = ({
	baseUrl,
	path = [],
	predicate = () => true,
}: {
	baseUrl: string;
	path?: string[];
	predicate?: (edition: Edition) => boolean;
}): string[] => {
	return editionList.reduce<string[]>((acc, edition) => {
		if (edition.langLocale && predicate(edition)) {
			return [
				...acc,
				linkTemplate(
					baseUrl,
					[edition.pageId, ...path].join('/'),
					edition.langLocale,
				),
			];
		}
		return acc;
	}, []);
};

const generateAlternateLangLinks = (
	baseUrl: string,
	pageId: string,
): string[] => {
	if (isNetworkFront(pageId)) {
		const pageEdition = getEditionFromPageId(pageId);
		const hasLangLocale = !!pageEdition?.langLocale;
		if (hasLangLocale) {
			return collectAlternateLangLinks({ baseUrl });
		}
	}
	const parsedEditionalisedPage = splitEditionalisedPage(pageId);
	const isEditionalisedPage = parsedEditionalisedPage !== undefined;
	if (isEditionalisedPage) {
		// e.g. uk/travel
		const [networkId, pageIdSuffix] = parsedEditionalisedPage;
		const pageEdition = getEditionFromPageId(networkId);
		const hasLangLocale = !!pageEdition?.langLocale;
		const hasEditionalisedPages = !!pageEdition?.hasEditionalisedPages;
		if (hasLangLocale && hasEditionalisedPages) {
			return collectAlternateLangLinks({
				baseUrl,
				path: [pageIdSuffix],
				predicate: (edition) => edition.hasEditionalisedPages,
			});
		}
	}
	return [];
};

export { generateAlternateLangLinks };
