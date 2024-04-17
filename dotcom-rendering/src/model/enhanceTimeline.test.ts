import assert from 'node:assert/strict';
import { images } from '../../fixtures/generated/images';
import type { FEElement } from '../../src/types/content';
import { enhanceTimeline } from './enhanceTimeline';

const identity = <A>(a: A): A => a;

const elements: FEElement[] = [
	{
		_type: 'model.dotcomrendering.pageElements.TimelineBlockElement',
		elementId: 'mock-id',
		sections: [
			{
				title: 'mock section title',
				events: [
					{
						title: 'mock event title',
						date: '1st January 2024',
						body: [],
						// Showcase image
						main: images[0],
					},
					{
						title: 'mock event title',
						date: '5th January 2024',
						body: [],
						// Half width image
						main: images[3],
					},
					{
						title: 'mock event title',
						date: '8th January 2024',
						body: [],
						// Media atom (no role)
						main: {
							_type: 'model.dotcomrendering.pageElements.MediaAtomBlockElement',
							elementId: 'mock-id',
							id: 'mock-id',
							assets: [],
						},
					},
				],
			},
		],
	},
];

describe('enhanceTimeline', () => {
	it('keeps a main media with a role that is valid', () => {
		const enhanced = enhanceTimeline(identity)(elements);
		assert.equal(
			enhanced[0]?._type,
			'model.dotcomrendering.pageElements.DCRTimelineBlockElement',
		);

		const timelineEvent = enhanced[0].events[0];
		assert.notEqual(timelineEvent, undefined);
		expect(timelineEvent?.main).toBeDefined();
	});

	it('drops a main media with a role that is not valid', () => {
		const enhanced = enhanceTimeline(identity)(elements);
		assert.equal(
			enhanced[0]?._type,
			'model.dotcomrendering.pageElements.DCRTimelineBlockElement',
		);

		const timelineEvent = enhanced[0].events[1];
		assert.notEqual(timelineEvent, undefined);
		expect(timelineEvent?.main).toBeUndefined();
	});

	it('keeps a main media without a role', () => {
		const enhanced = enhanceTimeline(identity)(elements);
		assert.equal(
			enhanced[0]?._type,
			'model.dotcomrendering.pageElements.DCRTimelineBlockElement',
		);

		const timelineEvent = enhanced[0].events[2];
		assert.notEqual(timelineEvent, undefined);
		expect(timelineEvent?.main).toBeDefined();
	});
});
