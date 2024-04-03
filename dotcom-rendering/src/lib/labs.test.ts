import type { Branding } from '../types/branding';
import { getOphanComponents } from './labs';

describe('getOphanComponents', () => {
	it('constructs the correct data attributes for branding in article meta', () => {
		const branding = { sponsorName: 'Some Sponsor' } as Branding;
		expect(
			getOphanComponents({ branding, locationPrefix: 'article-meta' }),
		).toStrictEqual({
			ophanComponentName: 'labs-logo | article-meta-some-sponsor',
			ophanComponentLink: 'labs-logo-article-meta-some-sponsor',
		});
	});

	it('constructs the correct data attributes for branding in related content', () => {
		const branding = { sponsorName: 'Some Sponsor' } as Branding;
		expect(
			getOphanComponents({
				branding,
				locationPrefix: 'article-related-content',
			}),
		).toStrictEqual({
			ophanComponentName:
				'labs-logo | article-related-content-some-sponsor',
			ophanComponentLink:
				'labs-logo-article-related-content-some-sponsor',
		});
	});
});
