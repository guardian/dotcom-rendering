import { disableCMP } from '../../lib/disableCMP.js';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';

describe('E2E Page rendering', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	it('Snapshot standard layout', function () {
		cy.visit(
			'/Article?url=https://www.theguardian.com/uk-news/2020/dec/04/edinburgh-hit-by-thundersnow-as-sonic-boom-wakes-residents',
		);

		cy.hydrate();
	});
});
