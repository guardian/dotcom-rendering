import type { Branding } from '../types/branding';
import { getOphanComponents } from './labs';

describe('getOphanComponents', () => {
	it('constructs the correct data attributes', () => {
		const branding = { sponsorName: 'Some Sponsor' } as Branding;
		expect(getOphanComponents(branding)).toStrictEqual({
			ophanComponentName: 'labs-logo | article-some-sponsor',
			ophanComponentLink: 'labs-logo-article-some-sponsor',
		});
	});
});
