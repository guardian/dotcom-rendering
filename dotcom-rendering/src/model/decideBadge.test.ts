import { BADGE_THIS_IS_EUROPE, decideBadge } from './decideBadge';

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
	describe('Using displayName', () => {
		it('returns correct badge for this is Europe', () => {
			const expectedResult = BADGE_THIS_IS_EUROPE;
			const result = decideBadge('This is Europe', []);
			expect(result).toMatchObject(expectedResult);
		});
	});

	describe('Using branding', () => {
		it('returns properties of the first badge if all cards have the same sponsor', () => {
			const branding = [brandingAmazon, brandingAmazon];

			const expectedResult = {
				imageSrc: brandingAmazon.logo.src,
				href: brandingAmazon.logo.link,
			};
			const result = decideBadge('displayName', branding);
			expect(result).toEqual(expectedResult);
		});

		it('returns undefined if all cards do not have the same sponsor', () => {
			const branding = [brandingAmazon, brandingGuardianOrg];

			const expectedResult = undefined;
			const result = decideBadge('displayName', branding);
			expect(result).toEqual(expectedResult);
		});

		it('returns undefined if no branding supplied', () => {
			const expectedResult = undefined;
			const result = decideBadge('displayName', []);
			expect(result).toEqual(expectedResult);
		});
	});

	it('returns undefined if not using displayName or branding', () => {
		const expectedResult = undefined;
		const result = decideBadge('NOT This is Europe', []);
		expect(result).toEqual(expectedResult);
	});
});
