// ----- Imports ----- //

import { createHash } from 'crypto';
import { Result } from 'result';

// ----- Setup ----- //

const imageResizer = 'https://i.guim.co.uk/img';

const defaultWidths = [140, 500, 1000, 1500, 2000, 2500, 3000];

// Percentage.
const defaultQuality = 85;
const lowerQuality = 45;

// ----- Types ----- //

enum Dpr {
	One,
	Two,
}

interface Srcsets {
	srcset: string;
	dpr2Srcset: string;
}

type ResizerSource = 'static' | 'uploads' | 'media';

// ----- Functions ----- //

/**
 * Get the resizing source for a given CAPI asset
 *
 * @param url The asset URL from CAPI
 * @returns An image resizer source
 */
const getSource = (url: URL): ResizerSource => {
	const subdomain = url.hostname.split('.')[0];

	switch (subdomain) {
		case 'static':
		case 'static-secure':
			return 'static';
		case 'uploads':
			return 'uploads';
		case 'media':
		default:
			return 'media';
	}
};

const sign = (salt: string, path: string): string =>
	createHash('md5')
		.update(salt + path)
		.digest('hex');

function src(salt: string, input: string, width: number, dpr: Dpr): string {
	return Result.fromUnsafe(() => new URL(input), 'invalid url').either(
		(_err) => input,
		(url) => {
			const service = getSource(url);

			const params = new URLSearchParams({
				width: width.toString(),
				quality:
					dpr === Dpr.Two
						? lowerQuality.toString()
						: defaultQuality.toString(),
				fit: 'bounds',
			});

			const path = `${url.pathname}?${params.toString()}`;
			const sig = sign(salt, path);

			return `${imageResizer}/${service}${path}&s=${sig}`;
		},
	);
}

const srcsetWithWidths =
	(widths: number[]) =>
	(url: string, salt: string, dpr: Dpr): string =>
		widths
			.map((width) => `${src(salt, url, width, dpr)} ${width}w`)
			.join(', ');

const srcset: (url: string, salt: string, dpr: Dpr) => string =
	srcsetWithWidths(defaultWidths);

const srcsets = (url: string, salt: string): Srcsets => ({
	srcset: srcset(url, salt, Dpr.One),
	dpr2Srcset: srcset(url, salt, Dpr.Two),
});

// ----- Exports ----- //

export type { Srcsets };

export { Dpr, src, srcset, srcsets, srcsetWithWidths };
