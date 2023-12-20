import type { Branding } from '../types/branding';
import { decideCollectionBranding } from './branding';

// For the purpose of these tests we don't care about the contents of the logo objects
const logo = {} as Branding['logo'];

describe('decideCollectionBranding', () => {
	it('use editorial badge (even with valid branding on cards) if series is defined', () => {
		const cardBranding = {
			brandingType: { name: 'paid-content' as const },
			sponsorName: 'foo',
			aboutThisLink: '',
			logo,
		};
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: 'politics/series/road-to-the-vote',
			cards: [
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
			],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toStrictEqual({
			kind: 'editorial',
			badge: {
				imageSrc: `/static/frontend/badges/EUReferendumBadge.svg`,
				href: `/politics/series/road-to-the-vote`,
			},
		});
	});

	it('picks branding from a card by their edition', () => {
		const cards = [
			{
				properties: {
					editionBrandings: [
						{
							edition: { id: 'UK' as const },
							branding: {
								brandingType: { name: 'paid-content' as const },
								sponsorName: 'foo',
								aboutThisLink: '',
								logo,
							},
						},
						{
							edition: { id: 'US' as const },
							branding: {
								brandingType: { name: 'sponsored' as const },
								sponsorName: 'bar',
								aboutThisLink: '',
								logo,
							},
						},
					],
				},
			},
		];
		const ukBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards,
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(ukBranding).toMatchObject({
			kind: 'paid-content',
			isFrontBranding: false,
			branding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'foo',
				aboutThisLink: '',
				logo,
			},
			isContainerBranding: false,
		});
		const usBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards,
			editionId: 'US',
			isContainerBranding: false,
		});
		expect(usBranding).toMatchObject({
			kind: 'sponsored',
			isFrontBranding: false,
			branding: {
				brandingType: { name: 'sponsored' },
				sponsorName: 'bar',
				aboutThisLink: '',
				logo,
			},
			isContainerBranding: false,
		});
	});

	it('is paid content derived from multiple cards', () => {
		const cardBranding = {
			brandingType: { name: 'paid-content' as const },
			sponsorName: 'foo',
			aboutThisLink: '',
			logo,
		};
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards: [
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
			],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toMatchObject({
			kind: 'paid-content',
			isFrontBranding: false,
			branding: cardBranding,
		});
	});

	it('undefined when not all cards have branding', () => {
		// The branding we'll apply to each card in this test
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards: [
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'paid-content' },
									sponsorName: 'foo',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'paid-content' },
									sponsorName: 'bar',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [],
					},
				},
			],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toBeUndefined();
	});

	it('is undefined when no cards have branding', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards: [
				{
					properties: {
						editionBrandings: [],
					},
				},
				{
					properties: {
						editionBrandings: [],
					},
				},
				{
					properties: {
						editionBrandings: [],
					},
				},
			],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toBeUndefined();
	});

	it('is undefined when cards have different branding types', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards: [
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'paid-content' },
									sponsorName: 'foo',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'sponsored' },
									sponsorName: 'bar',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'foundation' },
									sponsorName: 'baz',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
			],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toBeUndefined();
	});

	it('is sponsored branding when all of the branding types are sponsored and the names match', () => {
		const cardBranding = {
			brandingType: { name: 'sponsored' as const },
			sponsorName: 'foo',
			aboutThisLink: '',
			logo,
		};
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards: [
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
			],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toStrictEqual({
			kind: 'sponsored',
			isFrontBranding: false,
			branding: cardBranding,
			isContainerBranding: false,
		});
	});

	it('is undefined when branding cards are sponsored and have different sponsor names', () => {
		// The branding we'll apply to each card in this test
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards: [
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'sponsored' },
									sponsorName: 'foo',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'sponsored' },
									sponsorName: 'bar',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'sponsored' },
									sponsorName: 'baz',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
			],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toBeUndefined();
	});

	it('is paid content branding when all of the branding types are paid-content and the names match', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards: [
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'paid-content' },
									sponsorName: 'foo',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'paid-content' },
									sponsorName: 'foo',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
			],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toStrictEqual({
			kind: 'paid-content',
			isFrontBranding: false,
			branding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'foo',
				aboutThisLink: '',
				logo,
			},
			isContainerBranding: false,
		});
	});

	it('is undefined when branding cards are paid-content and have different sponsor names', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards: [
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'paid-content' },
									sponsorName: 'foo',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: {
									brandingType: { name: 'paid-content' },
									sponsorName: 'bar',
									aboutThisLink: '',
									logo,
								},
							},
						],
					},
				},
			],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toBeUndefined();
	});

	it('is front branding when present and possible to display', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'bar',
				aboutThisLink: '',
				logo,
			},
			couldDisplayFrontBranding: true,
			seriesTag: undefined,
			cards: [],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toStrictEqual({
			kind: 'paid-content',
			isFrontBranding: true,
			branding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'bar',
				aboutThisLink: '',
				logo,
			},
			isContainerBranding: false,
		});
	});

	it('is undefined when there is front branding (and no card branding) that is not eligible for display on this collection', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'bar',
				aboutThisLink: '',
				logo,
			},
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards: [],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toBeUndefined();
	});

	it('when cards are present', () => {
		const cardBranding = {
			brandingType: { name: 'paid-content' as const },
			sponsorName: 'foo',
			aboutThisLink: '',
			logo,
		};
		const collectionBranding = decideCollectionBranding({
			frontBranding: {
				brandingType: { name: 'sponsored' },
				sponsorName: 'bar',
				aboutThisLink: '',
				logo,
			},
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards: [
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
			],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toStrictEqual({
			kind: 'paid-content',
			isFrontBranding: false,
			branding: cardBranding,
			isContainerBranding: false,
		});
	});

	it('is undefined when front branding matches card branding, but we are not displaying front branding', () => {
		const cardBranding = {
			brandingType: { name: 'paid-content' as const },
			sponsorName: 'foo',
			aboutThisLink: '',
			logo,
		};
		const collectionBranding = decideCollectionBranding({
			frontBranding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'foo',
				aboutThisLink: '',
				logo,
			},
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards: [
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
				{
					properties: {
						editionBrandings: [
							{
								edition: { id: 'UK' },
								branding: cardBranding,
							},
						],
					},
				},
			],
			editionId: 'UK',
			isContainerBranding: false,
		});
		expect(collectionBranding).toBeUndefined();
	});
});
