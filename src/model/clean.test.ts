import { bigBullets } from './clean';

describe('clean', () => {
	it('anotates bullet characters with spans', () => {
		const test = '<p>•</p>';

		expect(bigBullets(test)).toBe(
			'<p><span class="bullet">&bull;</span></p>',
		);
	});
});
