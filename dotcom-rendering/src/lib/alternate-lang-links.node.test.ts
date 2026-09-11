import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
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
	.flatMap((edition) =>
		editionalisedPages.map((page) => `${edition.pageId}/${page}`),
	);

const everyEditionWithNoEditionalisedPages = editionList
	.filter((edition) => !edition.hasEditionalisedPages)
	.flatMap((edition) =>
		editionalisedPages.map((page) => `${edition.pageId}/${page}`),
	);

void nodeDescribe('alternate lang links', () => {
	void nodeIt(
		'generate hreflang links for network fronts with a lang locale',
		() => {
			for (const edition of everyEditionWithLangLocale) {
				const langLinks = generateAlternateLangLinks(
					'https://www.theguardian.com',
					edition.pageId,
				);
				assert.deepEqual(langLinks, [
					'<link rel="alternate" href="https://www.theguardian.com/uk" hreflang="en-GB" />',
					'<link rel="alternate" href="https://www.theguardian.com/us" hreflang="en-US" />',
					'<link rel="alternate" href="https://www.theguardian.com/au" hreflang="en-AU" />',
					'<link rel="alternate" href="https://www.theguardian.com/europe" hreflang="en-EU" />',
					'<link rel="alternate" href="https://www.theguardian.com/international" hreflang="en" />',
				]);
			}
		},
	);

	void nodeIt(
		'do NOT generate hreflang links for network fronts with NO lang locale',
		() => {
			for (const edition of everyEditionWithNoLangLocale) {
				assert.deepEqual(
					generateAlternateLangLinks(
						'https://www.theguardian.com',
						edition.pageId,
					),
					[],
				);
			}
		},
	);

	void nodeIt('generate hreflang links for editionalised pages', () => {
		for (const pageId of everyEditionWithEditionalisedPages) {
			const langLinks = generateAlternateLangLinks(
				'https://www.theguardian.com',
				pageId,
			);
			const pageIdSuffix = pageId.split('/')[1] ?? '';
			assert.deepEqual(langLinks, [
				`<link rel="alternate" href="https://www.theguardian.com/uk/${pageIdSuffix}" hreflang="en-GB" />`,
				`<link rel="alternate" href="https://www.theguardian.com/us/${pageIdSuffix}" hreflang="en-US" />`,
				`<link rel="alternate" href="https://www.theguardian.com/au/${pageIdSuffix}" hreflang="en-AU" />`,
			]);
		}
	});

	void nodeIt(
		'do NOT generate hreflang links for editions with NO editionalised pages',
		() => {
			for (const pageId of everyEditionWithNoEditionalisedPages) {
				assert.deepEqual(
					generateAlternateLangLinks(
						'https://www.theguardian.com',
						pageId,
					),
					[],
				);
			}
		},
	);

	void nodeIt(
		'do NOT generate hreflang links for NON editionalised pages',
		() => {
			const pageIdsNotEditionalisedPages = [
				'uk/something',
				'us/something',
				'au/something',
				'international/something',
				'uk/business/something',
			];
			for (const pageId of pageIdsNotEditionalisedPages) {
				assert.deepEqual(
					generateAlternateLangLinks(
						'https://www.theguardian.com',
						pageId,
					),
					[],
				);
			}
		},
	);
});
