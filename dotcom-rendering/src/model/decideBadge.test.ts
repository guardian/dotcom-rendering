import {
	decideBadge,
	getBadgeFromBranding,
	getEditorialBadge,
} from './decideBadge';

jest.mock('./badges');

const brandingAmazon = {
	brandingType: {
		name: 'paid-content',
	},
	sponsorName: 'Amazon',
	logo: {
		src: 'https://static.theguardian.com/commercial/sponsor/04/Oct/2018/6b15ba78-da66-415d-8540-a34cc4d3156b-romanoffs_TT_PO-center.png',
		dimensions: {
			width: 140,
			height: 90,
		},
		link: 'https://www.amazon.com/dp/B07FV6K8HF',
		label: 'Paid for by',
	},
	aboutThisLink:
		'https://www.theguardian.com/info/2016/jan/25/content-funding',
};

const brandingGuardianOrg = {
	brandingType: {
		name: 'sponsored',
	},
	sponsorName: 'guardian.org',
	logo: {
		src: 'https://static.theguardian.com/commercial/sponsor/16/Mar/2022/1e17c6f8-8114-44e9-8e10-02b8e5c6b929-theguardianorg badge.png',
		dimensions: {
			width: 280,
			height: 180,
		},
		link: 'https://www.theguardian.com/global-development/2021/feb/21/about-the-rights-and-freedom-series',
		label: 'Supported by',
	},
	logoForDarkBackground: {
		src: 'https://static.theguardian.com/commercial/sponsor/16/Mar/2022/2cb64c63-e09c-4877-90ee-b5fe4eac7fc6-44d00539-51bd-4749-a16a-7dde8ff8e19b-a060074a-c6d4-4e6e-b33a-8f4930d5617c-g.org_hc.png',
		dimensions: {
			width: 280,
			height: 180,
		},
		link: 'https://www.theguardian.com/global-development/2021/feb/21/about-the-rights-and-freedom-series',
		label: 'Supported by',
	},
	aboutThisLink:
		'https://www.theguardian.com/global-development/2021/feb/21/about-the-rights-and-freedom-series',
};

describe('Decide badge', () => {
	describe('getBadgeFromSeriesTag', () => {
		it('returns correct standard badge', () => {
			const tagId = 'uk-news/series/the-brexit-gamble';
			const expectedResult = {
				href: `/${tagId}`,
				imageSrc: `/static/frontend/badges/EUReferendumBadge.svg`,
			};
			const result = getEditorialBadge(tagId);
			expect(result).toMatchObject(expectedResult);
		});

		it('returns correct special badge', () => {
			const tagId = 'tone/newsletter-tone';
			const expectedResult = {
				href: `/${tagId}`,
				imageSrc: `/static/frontend/badges/newsletter-badge.svg`,
			};
			const result = getEditorialBadge(tagId);
			expect(result).toMatchObject(expectedResult);
		});

		it('returns undefined if no standard or special badge match found for series tag', () => {
			const tagId = 'lifeandstyle/home-and-garden';
			const expectedResult = undefined;
			const result = getEditorialBadge(tagId);
			expect(result).toEqual(expectedResult);
		});

		it('returns undefined for undefined series tag', () => {
			const tagId = undefined;
			const expectedResult = undefined;
			const result = getEditorialBadge(tagId);
			expect(result).toEqual(expectedResult);
		});
	});

	describe('getBadgeFromBranding function', () => {
		it('returns properties of the first badge if all cards have the same sponsor', () => {
			const branding = [brandingAmazon, brandingAmazon];

			const expectedResult = {
				imageSrc: brandingAmazon.logo.src,
				href: brandingAmazon.logo.link,
			};
			const result = getBadgeFromBranding(branding);
			expect(result).toEqual(expectedResult);
		});

		it('returns undefined if all cards do not have the same sponsor', () => {
			const branding = [brandingAmazon, brandingGuardianOrg];

			const expectedResult = undefined;
			const result = getBadgeFromBranding(branding);
			expect(result).toEqual(expectedResult);
		});

		it('returns undefined if no branding supplied', () => {
			const expectedResult = undefined;

			const result = getBadgeFromBranding(undefined);
			expect(result).toEqual(expectedResult);

			const result2 = getBadgeFromBranding([]);
			expect(result2).toEqual(expectedResult);
		});
	});

	describe('decideBadge function', () => {
		it('return series tag match if both seriesTag and branding provided', () => {
			const branding = [brandingAmazon, brandingAmazon];
			const tagId = 'uk-news/series/the-brexit-gamble';
			const expectedResult = {
				href: `/${tagId}`,
				imageSrc: `/static/frontend/badges/EUReferendumBadge.svg`,
			};
			const result = decideBadge(tagId, branding);
			expect(result).toMatchObject(expectedResult);
		});

		it('returns branding sponsor if branding but no series tag match', () => {
			const branding = [brandingAmazon, brandingAmazon];

			const expectedResult = {
				imageSrc: brandingAmazon.logo.src,
				href: brandingAmazon.logo.link,
			};
			const result = decideBadge('seriesTag', branding);
			expect(result).toEqual(expectedResult);
		});

		it('returns undefined if no match by seriesTag or branding', () => {
			const expectedResult = undefined;
			const result = decideBadge('seriesTag', []);
			expect(result).toEqual(expectedResult);
		});
	});
});
