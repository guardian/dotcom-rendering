import type { Branding } from '../types/branding';
import { decideCollectionBranding } from './branding';

// For the purpose of these tests we don't care about the contents of the logo objects
const logo = {} as Branding['logo'];

describe('decideCollectionBranding', () => {
	it('use editorial badge (even with valid branding on cards) if series is defined', () => {
		const cardBranding = {
			brandingType: { name: 'paid-content' },
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
		});
		expect(collectionBranding).toStrictEqual({
			kind: 'editorial',
			badge: {
				imageSrc: `/static/frontend/badges/EUReferendumBadge.svg`,
				href: `/politics/series/road-to-the-vote`,
			},
		});
	});

	it('correctly picks branding from a card by their edition', () => {
		const cards = [
			{
				properties: {
					editionBrandings: [
						{
							edition: { id: 'UK' as const },
							branding: {
								brandingType: { name: 'paid-content' },
								sponsorName: 'foo',
								aboutThisLink: '',
								logo,
							},
						},
						{
							edition: { id: 'US' as const },
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
		];
		const ukBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards,
			editionId: 'UK',
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
		});
		const usBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			seriesTag: undefined,
			cards,
			editionId: 'US',
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
		});
	});

	it('paid content derived from multiple cards', () => {
		const cardBranding = {
			brandingType: { name: 'paid-content' },
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
		});
		expect(collectionBranding).toMatchObject({
			kind: 'paid-content',
			isFrontBranding: false,
			branding: cardBranding,
		});
	});

	it('cards have different branding types', () => {
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
		});
		expect(collectionBranding).toBeUndefined();
	});

	it('sponsored branding when all of the branding types are sponsored and the names match', () => {
		const cardBranding = {
			brandingType: { name: 'sponsored' },
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
		});
		expect(collectionBranding).toStrictEqual({
			kind: 'sponsored',
			isFrontBranding: false,
			branding: cardBranding,
		});
	});

	it('sponsored card branding with different sponsor names returns undefined', () => {
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
		});
		expect(collectionBranding).toBeUndefined();
	});

	it('returns undefined when not all cards have branding', () => {
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
		});
		expect(collectionBranding).toBeUndefined();
	});

	it('show front branding when present and possible to display', () => {
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
		});
	});

	it('undefined when there is front branding but not eligible for display on this collection', () => {
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
		});
		expect(collectionBranding).toBeUndefined();
	});

	it('when cards are present', () => {
		const cardBranding = {
			brandingType: { name: 'paid-content' },
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
		});
		expect(collectionBranding).toStrictEqual({
			kind: 'paid-content',
			isFrontBranding: false,
			branding: cardBranding,
		});
	});

	it('do not show branding when front branding matches, but we are not displaying front branding', () => {
		const cardBranding = {
			brandingType: { name: 'paid-content' },
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
		});
		expect(collectionBranding).toBeUndefined();
	});
});
