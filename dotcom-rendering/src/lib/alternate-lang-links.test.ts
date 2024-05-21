import { generateAlternateLangLinks } from './alternate-lang-links';
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

// This is an invalid combination e.g. europe/travel
const everyEditionWithNoEditionalisedPages = editionList
	.filter((edition) => !edition.hasEditionalisedPages)
	.map((edition) =>
		editionalisedPages.map((page) => `${edition.pageId}/${page}`),
	)
	.flat();

describe('alternate lang links', () => {
	it('generate hreflang links for network fronts with a lang locale', () => {
		const langLinksForEditionsWithLangLocale =
			everyEditionWithLangLocale.map((edition) => {
				return generateAlternateLangLinks(
					'https://www.theguardian.com',
					edition.pageId,
				);
			});
		for (const langLinks of langLinksForEditionsWithLangLocale) {
			expect(langLinks.length).toBe(5);
			expect(langLinks).toEqual([
				'<link rel="alternate" href="https://www.theguardian.com/uk" hreflang="en-GB" />',
				'<link rel="alternate" href="https://www.theguardian.com/us" hreflang="en-US" />',
				'<link rel="alternate" href="https://www.theguardian.com/au" hreflang="en-AU" />',
				'<link rel="alternate" href="https://www.theguardian.com/europe" hreflang="en-EU" />',
				'<link rel="alternate" href="https://www.theguardian.com/international" hreflang="en" />',
			]);
		}
	});
	it('do NOT generate hreflang links for network fronts with NO lang locale', () => {
		const langLinksForEditionsWithNoLangLocale =
			everyEditionWithNoLangLocale.map((edition) => {
				return generateAlternateLangLinks(
					'https://www.theguardian.com',
					edition.pageId,
				);
			});
		for (const langLinks of langLinksForEditionsWithNoLangLocale) {
			expect(langLinks.length).toBe(0);
		}
	});
	it('generate hreflang links for editionalised pages', () => {
		for (const pageId of everyEditionWithEditionalisedPages) {
			const langLinks = generateAlternateLangLinks(
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
	it('do NOT generate hreflang links for editions with NO editionalised pages', () => {
		for (const pageId of everyEditionWithNoEditionalisedPages) {
			const langLinks = generateAlternateLangLinks(
				'https://www.theguardian.com',
				pageId,
			);
			expect(langLinks.length).toBe(0);
		}
	});
	it('do NOT generate hreflang links for NON editionalised pages', () => {
		const pageIdsNotEditionalisedPages = [
			'uk/something',
			'us/something',
			'au/something',
			'international/something',
			'uk/business/something',
		];
		for (const pageId of pageIdsNotEditionalisedPages) {
			const langLinks = generateAlternateLangLinks(
				'https://www.theguardian.com',
				pageId,
			);
			expect(langLinks.length).toBe(0);
		}
	});
});
