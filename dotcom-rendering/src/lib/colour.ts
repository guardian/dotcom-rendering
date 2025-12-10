// https://stackoverflow.com/a/5624139
const hexToRgb = (
	hex: string,
): {
	r: number;
	g: number;
	b: number;
} | null => {
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
};

// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
// Based on: https://github.com/siege-media/contrast-ratio/blob/gh-pages/color.js
const processLuminance = (channel: number): number => {
	const scaledChannel = channel / 255;
	return scaledChannel <= 0.03928
		? scaledChannel / 12.92
		: Math.pow((scaledChannel + 0.055) / 1.055, 2.4);
};

const getLuminance = (colour: string): number => {
	const rgb = hexToRgb(colour);
	if (!rgb) return 0;
	return (
		processLuminance(rgb.r) * 0.2126 +
		processLuminance(rgb.g) * 0.7152 +
		processLuminance(rgb.b) * 0.0722
	);
};

// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
export const getContrast = (colour1: string, colour2: string): number => {
	const luminance1 = getLuminance(colour1);
	const luminance2 = getLuminance(colour2);
	const brightest = Math.max(luminance1, luminance2);
	const darkest = Math.min(luminance1, luminance2);
	return (brightest + 0.05) / (darkest + 0.05);
};

const getBrightness = (colour: string): number => {
	// http://www.w3.org/TR/AERT#color-contrast
	const rgb = hexToRgb(colour);
	return rgb ? (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 : 0;
};

// Based on https://github.com/bgrins/TinyColor
export const isLight = (colour: string): boolean => {
	if (!colour.startsWith('#')) {
		return getBrightness(`#${colour}`) > 128;
	}
	return getBrightness(colour) > 128;
};
