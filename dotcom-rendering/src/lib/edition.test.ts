import {
	editionalisedPages,
	editionList,
	isEditionalisedPage,
	isNetworkFront,
} from './edition';

const everyNetworkFront = editionList.map((edition) => edition.pageId);

const everyEditionalisedPage = editionList
	.map((edition) =>
		editionalisedPages.map((page) => `${edition.pageId}/${page}`),
	)
	.flat();

describe('is network front', () => {
	it('returns true if pageId is a network front', () => {
		expect(everyNetworkFront.every((page) => isNetworkFront(page))).toBe(
			true,
		);
	});
	it('returns false if pageId is NOT a network front', () => {
		expect(
			everyEditionalisedPage.every((page) => isNetworkFront(page)),
		).toBe(false);
		expect(isNetworkFront('eu')).toBe(false);
		expect(isNetworkFront('int')).toBe(false);
		expect(isNetworkFront('uk/')).toBe(false);
	});
});

describe('is editionalised page', () => {
	it('returns true if pageId is editionalised', () => {
		expect(
			everyEditionalisedPage.every((page) => isEditionalisedPage(page)),
		).toBe(true);
	});
	it('returns false if pageId is NOT editionalised', () => {
		expect(
			everyNetworkFront.every((page) => isEditionalisedPage(page)),
		).toBe(false);
		expect(isEditionalisedPage('uk')).toBe(false);
		expect(isEditionalisedPage('au')).toBe(false);
		expect(isEditionalisedPage('international')).toBe(false);
		expect(isEditionalisedPage('travel')).toBe(false);
		expect(isEditionalisedPage('culture')).toBe(false);
		expect(isEditionalisedPage('lifeandstyle')).toBe(false);
		expect(isEditionalisedPage('lifeandstyle/health-and-wellbeing')).toBe(
			false,
		);
	});
});
