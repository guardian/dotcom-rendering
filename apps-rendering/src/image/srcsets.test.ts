// ----- Imports ----- //

import { Dpr, src, srcset } from './srcsets';

// ----- Setup ----- //

const imagePath =
	'948ad0a2ebe6d931d8827ea89ac184986af76c1b/0_22_1313_788/master/1313.jpg';
const staticDomain = 'https://static.guim.co.uk';
const mediaDomain = 'https://media.guim.co.uk';
const uploadsDomain = 'https://uploads.guim.co.uk';
const staticSecureDomain = 'https://static-secure.guim.co.uk';

// ----- Tests ----- //

describe('srcsets', () => {
	describe('srcset', () => {
		test('show lower quality when DPR is 2', () => {
			const result = srcset(`${mediaDomain}/${imagePath}`, '', Dpr.Two);
			expect(result).toContain('quality=45');
		});

		test('show higher quality when DPR is 1', () => {
			const result = srcset(`${mediaDomain}/${imagePath}`, '', Dpr.One);
			expect(result).toContain('quality=85');
		});
	});

	describe('src', () => {
		test('provide a valid URL for "static" assets', () => {
			const result = new URL(
				src('', `${staticDomain}/${imagePath}`, 500, Dpr.One),
			);

			expect(result.pathname).toBe(`/img/static/${imagePath}`);
		});

		test('provide a valid URL for "media" assets', () => {
			const result = new URL(
				src('', `${mediaDomain}/${imagePath}`, 500, Dpr.One),
			);

			expect(result.pathname).toBe(`/img/media/${imagePath}`);
		});

		test('provide a valid URL for "uploads" assets', () => {
			const result = new URL(
				src('', `${uploadsDomain}/${imagePath}`, 500, Dpr.One),
			);

			expect(result.pathname).toBe(`/img/uploads/${imagePath}`);
		});

		test('provide a valid URL for "static-secure" assets', () => {
			const result = new URL(
				src('', `${staticSecureDomain}/${imagePath}`, 500, Dpr.One),
			);

			expect(result.pathname).toBe(`/img/static/${imagePath}`);
		});

		test('attempt to use a media URL for unrecognised assets', () => {
			const result = new URL(
				src(
					'',
					`https://invalid.guim.co.uk/${imagePath}`,
					500,
					Dpr.One,
				),
			);

			expect(result.pathname).toBe(`/img/media/${imagePath}`);
		});
	});
});
