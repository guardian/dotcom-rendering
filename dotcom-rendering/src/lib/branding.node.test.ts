import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Branding } from '../types/branding';
import { decideCollectionBranding, decideTagPageBranding } from './branding';

// For the purpose of these tests we don't care about the contents of the logo objects
const logo = {} as Branding['logo'];

const assertMatchObject = (actual: unknown, expected: unknown): void => {
	if (expected === null || typeof expected !== 'object') {
		assert.deepEqual(actual, expected);
		return;
	}

	assert.ok(actual !== null && typeof actual === 'object');
	for (const [key, value] of Object.entries(expected)) {
		assertMatchObject((actual as Record<string, unknown>)[key], value);
	}
};

void describe('decideCollectionBranding', () => {
	void it('picks branding from a card by their edition', () => {
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
			cards,
			editionId: 'UK',
			isContainerBranding: false,
		});
		assertMatchObject(ukBranding, {
			kind: 'paid-content',
			isFrontBranding: false,
			branding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'foo',
				aboutThisLink: '',
				logo,
			},
			isContainerBranding: false,
			hasMultipleBranding: false,
		});
		const usBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
			cards,
			editionId: 'US',
			isContainerBranding: false,
		});
		assertMatchObject(usBranding, {
			kind: 'sponsored',
			isFrontBranding: false,
			branding: {
				brandingType: { name: 'sponsored' },
				sponsorName: 'bar',
				aboutThisLink: '',
				logo,
			},
			isContainerBranding: false,
			hasMultipleBranding: false,
		});
	});

	void it('is paid content derived from multiple cards', () => {
		const cardBranding = {
			brandingType: { name: 'paid-content' as const },
			sponsorName: 'foo',
			aboutThisLink: '',
			logo,
		};
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
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
		assertMatchObject(collectionBranding, {
			kind: 'paid-content',
			isFrontBranding: false,
			branding: cardBranding,
		});
	});

	void it('undefined when not all cards have branding', () => {
		// The branding we'll apply to each card in this test
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
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
		assert.equal(collectionBranding, undefined);
	});

	void it('is undefined when no cards have branding', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
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
		assert.equal(collectionBranding, undefined);
	});

	void it('is undefined when cards have different branding types', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
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
		assert.equal(collectionBranding, undefined);
	});

	void it('is sponsored branding when all of the branding types are sponsored and the names match', () => {
		const cardBranding = {
			brandingType: { name: 'sponsored' as const },
			sponsorName: 'foo',
			aboutThisLink: '',
			logo,
		};
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
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
		assert.deepEqual(collectionBranding, {
			kind: 'sponsored',
			isFrontBranding: false,
			branding: cardBranding,
			isContainerBranding: false,
			hasMultipleBranding: false,
		});
	});

	void it('is undefined when branding cards are sponsored and have different sponsor names', () => {
		// The branding we'll apply to each card in this test
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
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
		assert.equal(collectionBranding, undefined);
	});

	void it('is paid content branding when all of the branding types are paid-content and the names match', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
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
		assert.deepEqual(collectionBranding, {
			kind: 'paid-content',
			isFrontBranding: false,
			branding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'foo',
				aboutThisLink: '',
				logo,
			},
			isContainerBranding: false,
			hasMultipleBranding: false,
		});
	});

	void it('is paid content multiple branding when branding cards are paid-content and have different sponsor names', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: undefined,
			couldDisplayFrontBranding: false,
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
		assert.deepEqual(collectionBranding, {
			kind: 'paid-content',
			isFrontBranding: false,
			branding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'foo',
				aboutThisLink: '',
				logo,
			},
			isContainerBranding: false,
			hasMultipleBranding: true,
		});
	});

	void it('is front branding when present and possible to display', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'bar',
				aboutThisLink: '',
				logo,
			},
			couldDisplayFrontBranding: true,
			cards: [],
			editionId: 'UK',
			isContainerBranding: false,
		});
		assert.deepEqual(collectionBranding, {
			kind: 'paid-content',
			isFrontBranding: true,
			branding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'bar',
				aboutThisLink: '',
				logo,
			},
			isContainerBranding: false,
			hasMultipleBranding: false,
		});
	});

	void it('is undefined when there is front branding (and no card branding) that is not eligible for display on this collection', () => {
		const collectionBranding = decideCollectionBranding({
			frontBranding: {
				brandingType: { name: 'paid-content' },
				sponsorName: 'bar',
				aboutThisLink: '',
				logo,
			},
			couldDisplayFrontBranding: false,
			cards: [],
			editionId: 'UK',
			isContainerBranding: false,
		});
		assert.equal(collectionBranding, undefined);
	});

	void it('when cards are present', () => {
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
		assert.deepEqual(collectionBranding, {
			kind: 'paid-content',
			isFrontBranding: false,
			branding: cardBranding,
			isContainerBranding: false,
			hasMultipleBranding: false,
		});
	});

	void it('is undefined when front branding matches card branding, but we are not displaying front branding', () => {
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
		assert.equal(collectionBranding, undefined);
	});
});

void describe('decideTagPageBranding', () => {
	void it('picks branding from a tag page by their edition', () => {
		const branding = {
			brandingType: { name: 'sponsored' },
			sponsorName: 'Guardian.org',
			aboutThisLink: '',
			logo,
		} satisfies Branding;

		const tagPageBranding = decideTagPageBranding({
			branding,
		});

		assertMatchObject(tagPageBranding, {
			kind: 'sponsored',
			isFrontBranding: true,
			branding: {
				brandingType: { name: 'sponsored' },
				sponsorName: 'Guardian.org',
				aboutThisLink: '',
			},
			isContainerBranding: false,
			hasMultipleBranding: false,
		});
	});
	void it('is undefined when branding does not have a brandingType name present', () => {
		const branding = {
			sponsorName: 'Guardian.org',
			aboutThisLink: '',
			logo,
		};

		const tagPageBranding = decideTagPageBranding({
			branding,
		});
		assert.equal(tagPageBranding, undefined);
	});
});
