// https://stackoverflow.com/a/5624139
function hexToRgb(hex: string): {
	r: number;
	g: number;
	b: number;
} | null {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	const fullHex = hex.replace(shorthandRegex, ([, r, g, b]) => {
		return [r, r, g, g, b, b].join('');
	});

	const [, r, g, b] =
		/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex) ?? [];
	return r && g && b
		? {
				r: parseInt(r, 16),
				g: parseInt(g, 16),
				b: parseInt(b, 16),
		  }
		: null;
}

function getBrightness(colour: string): number {
	// http://www.w3.org/TR/AERT#color-contrast
	const rgb = hexToRgb(colour);
	return rgb ? (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 : 0;
}

// Based on https://github.com/bgrins/TinyColor
export const isLight = (colour: string): boolean => {
	if (!colour.startsWith('#')) {
		return getBrightness(`#${colour}`) > 128;
	}
	return getBrightness(colour) > 128;
};
