import { createAlternateLangLinks } from './alternate-lang-links';
import { editionList } from './edition';

const everyEditionWithLangLocale = editionList.filter(
	(edition) => edition.langLocale,
);

const everyEditionWithNoLangLocale = editionList.filter(
	(edition) => !edition.langLocale,
);

describe('alternate lang links', () => {
	it('network fronts with a lang locale', () => {
		const editionsWithLangLocale = everyEditionWithLangLocale.map(
			(edition) => {
				return createAlternateLangLinks(
					'https://www.theguardian.com',
					edition.pageId,
				);
			},
		);
		for (const langLinks of editionsWithLangLocale) {
			expect(langLinks.length).toBe(4);
			expect(langLinks).toEqual([
				'<link rel="alternate" href="https://www.theguardian.com/uk" hreflang="en-GB" />',
				'<link rel="alternate" href="https://www.theguardian.com/us" hreflang="en-US" />',
				'<link rel="alternate" href="https://www.theguardian.com/au" hreflang="en-AU" />',
				'<link rel="alternate" href="https://www.theguardian.com/international" hreflang="en" />',
			]);
		}
	});
	it('network fronts with NO lang locale', () => {
		const editionsWithNoLangLocale = everyEditionWithNoLangLocale.map(
			(edition) => {
				return createAlternateLangLinks(
					'https://www.theguardian.com',
					edition.pageId,
				);
			},
		);
		for (const langLinks of editionsWithNoLangLocale) {
			expect(langLinks.length).toBe(0);
		}
	});
});
