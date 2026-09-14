import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Branding } from '../types/branding';
import { getOphanComponents } from './labs';

void describe('getOphanComponents', () => {
	void it('constructs the correct data attributes for branding in article meta', () => {
		const branding = { sponsorName: 'Some Sponsor' } as Branding;
		assert.deepEqual(
			getOphanComponents({
				branding,
				locationPrefix: 'article-meta',
			}),
			{
				ophanComponentName: 'labs-logo | article-meta-some-sponsor',
				ophanComponentLink: 'labs-logo-article-meta-some-sponsor',
			},
		);
	});

	void it('constructs the correct data attributes for branding in related content', () => {
		const branding = { sponsorName: 'Some Sponsor' } as Branding;
		assert.deepEqual(
			getOphanComponents({
				branding,
				locationPrefix: 'article-related-content',
			}),
			{
				ophanComponentName:
					'labs-logo | article-related-content-some-sponsor',
				ophanComponentLink:
					'labs-logo-article-related-content-some-sponsor',
			},
		);
	});
});
