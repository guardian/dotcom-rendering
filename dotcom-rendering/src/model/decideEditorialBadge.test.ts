import { decideEditorialBadge } from './decideEditorialBadge';

jest.mock('./badges');

describe('decideEditorialBadge', () => {
	it('returns correct standard badge', () => {
		const tagId = 'uk-news/series/the-brexit-gamble';
		const expectedResult = {
			href: `/${tagId}`,
			imageSrc: `/static/frontend/badges/EUReferendumBadge.svg`,
		};
		const result = decideEditorialBadge(tagId);
		expect(result).toMatchObject(expectedResult);
	});

	it('returns correct special badge', () => {
		const tagId = 'tone/newsletter-tone';
		const expectedResult = {
			href: `/${tagId}`,
			imageSrc: `/static/frontend/badges/newsletter-badge.svg`,
		};
		const result = decideEditorialBadge(tagId);
		expect(result).toMatchObject(expectedResult);
	});

	it('returns undefined if no standard or special badge match found for series tag', () => {
		const tagId = 'lifeandstyle/home-and-garden';
		const expectedResult = undefined;
		const result = decideEditorialBadge(tagId);
		expect(result).toEqual(expectedResult);
	});

	it('returns undefined for undefined series tag', () => {
		const tagId = undefined;
		const expectedResult = undefined;
		const result = decideEditorialBadge(tagId);
		expect(result).toEqual(expectedResult);
	});
});
