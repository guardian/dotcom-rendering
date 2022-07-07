import { disableCMP } from '../../lib/disableCMP.js';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';
import { breakpoints } from '@guardian/source-foundations';
import '@percy/cypress';

describe('Snapshot standard layout', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	it('Snapshot all breakpoints', function () {
		cy.visit(
			'/Article?url=https://www.theguardian.com/uk-news/2020/dec/04/edinburgh-hit-by-thundersnow-as-sonic-boom-wakes-residents',
		);

		cy.hydrate();

		cy.percySnapshot('Standard Layout', {
			widths: Object.values(breakpoints),
		});
	});
});
