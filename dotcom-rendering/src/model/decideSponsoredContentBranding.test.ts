import type { Branding } from '../types/branding';
import { decideSponsoredContentBranding } from './decideSponsoredContentBranding';

const editionBrandingWithSponsor: Branding = {
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

describe('decideSponsoredContentBranding', () => {
	it('returns sponsored branding if all cards in a collection have sponsored branding, they have the same sponsor and front has the same branding', () => {
		expect(
			decideSponsoredContentBranding(
				4,
				[
					editionBrandingWithSponsor,
					editionBrandingWithSponsor,
					editionBrandingWithSponsor,
					editionBrandingWithSponsor,
				],
				true,
				'fixed/small/slow-IV',
			),
		).toEqual(editionBrandingWithSponsor);
	});

	it('returns undefined if at least one card in the collection does not have sponsored branding', () => {
		expect(
			decideSponsoredContentBranding(
				4,
				Array(3).fill(editionBrandingWithSponsor),
				false,
				'fixed/small/slow-IV',
			),
		).toEqual(undefined);
	});

	it('returns undefined if at least one card in the collection has different sponsor from the rest', () => {
		const editionBrandingWithDifferentSponsor: Branding = {
			brandingType: {
				name: 'sponsored',
			},
			sponsorName: 'Bertha Foundation',
			logo: {
				src: 'https://static.theguardian.com/commercial/sponsor/28/Mar/2017/d1105d96-b067-4091-81ce-02f7c7c24173-Logo.png',
				dimensions: {
					width: 108,
					height: 45,
				},
				link: 'http://www.berthafoundation.org/',
				label: 'Supported by',
			},
			logoForDarkBackground: {
				src: 'https://static.theguardian.com/commercial/sponsor/28/Mar/2017/8aabe16e-fd35-4f3c-a39b-3ec149877f56-Logo.png',
				dimensions: {
					width: 108,
					height: 45,
				},
				link: 'http://www.berthafoundation.org/',
				label: 'Supported by',
			},
			aboutThisLink:
				'https://www.theguardian.com/info/2016/aug/31/about-guardian-bertha-documentary-partnership',
		};

		expect(
			decideSponsoredContentBranding(
				4,
				Array(3)
					.fill(editionBrandingWithSponsor)
					.fill(editionBrandingWithDifferentSponsor),
				false,
				'fixed/small/slow-IV',
			),
		).toEqual(undefined);
	});

	it('returns undefined if front does not have the same branding as the cards', () => {
		expect(
			decideSponsoredContentBranding(
				4,
				Array(4).fill(editionBrandingWithSponsor),
				false,
				'fixed/small/slow-IV',
			),
		).toEqual(undefined);
	});

	it('returns undefined if the container is a thrasher', () => {
		expect(
			decideSponsoredContentBranding(
				4,
				Array(4).fill(editionBrandingWithSponsor),
				true,
				'fixed/thrasher',
			),
		).toEqual(undefined);
	});
});
