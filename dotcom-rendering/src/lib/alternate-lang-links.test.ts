import { createAlternateLangLinks } from './alternate-lang-links';
import { editionalisedPages, editionList } from './edition';

const everyEditionWithLangLocale = editionList.filter(
	(edition) => edition.langLocale,
);

const everyEditionWithNoLangLocale = editionList.filter(
	(edition) => !edition.langLocale,
);

const everyEditionWithEditionalisedPages = editionList
	.filter((edition) => edition.hasEditionalisedPages)
	.map((edition) =>
		editionalisedPages.map((page) => `${edition.pageId}/${page}`),
	)
	.flat();

const everyEditionWithNoEditionalisedPages = editionList
	.filter((edition) => !edition.hasEditionalisedPages)
	.map((edition) =>
		editionalisedPages.map((page) => `${edition.pageId}/${page}`),
	)
	.flat();

describe('alternate lang links', () => {
	it('pageIds for network fronts with a lang locale', () => {
		const langLinksForEditionsWithLangLocale =
			everyEditionWithLangLocale.map((edition) => {
				return createAlternateLangLinks(
					'https://www.theguardian.com',
					edition.pageId,
				);
			});
		for (const langLinks of langLinksForEditionsWithLangLocale) {
			expect(langLinks.length).toBe(4);
			expect(langLinks).toEqual([
				'<link rel="alternate" href="https://www.theguardian.com/uk" hreflang="en-GB" />',
				'<link rel="alternate" href="https://www.theguardian.com/us" hreflang="en-US" />',
				'<link rel="alternate" href="https://www.theguardian.com/au" hreflang="en-AU" />',
				'<link rel="alternate" href="https://www.theguardian.com/international" hreflang="en" />',
			]);
		}
	});
	it('pageIds for network fronts with NO lang locale', () => {
		const langLinksForEditionsWithNoLangLocale =
			everyEditionWithNoLangLocale.map((edition) => {
				return createAlternateLangLinks(
					'https://www.theguardian.com',
					edition.pageId,
				);
			});
		for (const langLinks of langLinksForEditionsWithNoLangLocale) {
			expect(langLinks.length).toBe(0);
		}
	});
	it('pageIds for editions with editionalised pages', () => {
		for (const pageId of everyEditionWithEditionalisedPages) {
			const langLinks = createAlternateLangLinks(
				'https://www.theguardian.com',
				pageId,
			);

			const pageIdSuffix = pageId.split('/')[1] ?? '';
			expect(langLinks.length).toBe(3);
			expect(langLinks).toEqual([
				`<link rel="alternate" href="https://www.theguardian.com/uk/${pageIdSuffix}" hreflang="en-GB" />`,
				`<link rel="alternate" href="https://www.theguardian.com/us/${pageIdSuffix}" hreflang="en-US" />`,
				`<link rel="alternate" href="https://www.theguardian.com/au/${pageIdSuffix}" hreflang="en-AU" />`,
			]);
		}
	});
	it('pageIds for editions with NO editionalised pages', () => {
		for (const pageId of everyEditionWithNoEditionalisedPages) {
			const langLinks = createAlternateLangLinks(
				'https://www.theguardian.com',
				pageId,
			);
			expect(langLinks.length).toBe(0);
		}
	});
	it('pageIds that are NOT editionalised pages', () => {
		const pageIdsNotEditionalisedPages = [
			'uk/something',
			'us/something',
			'au/something',
			'international/something',
			'uk/business/something',
		];
		for (const pageId of pageIdsNotEditionalisedPages) {
			const langLinks = createAlternateLangLinks(
				'https://www.theguardian.com',
				pageId,
			);
			expect(langLinks.length).toBe(0);
		}
	});
});
