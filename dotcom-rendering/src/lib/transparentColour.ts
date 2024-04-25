const getColour = (string: string) => {
	switch (string.length) {
		case 2:
			return parseInt(string, 16);
		case 1:
			return parseInt(string + string, 16);
		default:
			return 127;
	}
};

const fallback = 'rgba(127, 127, 127, 0.5)';

/**
 * Transforms a hex colour to a transparent one of the same colour.
 *
 * The alternative [#RRGGBBAA notation is not well supported][caniuse],
 * so we used the more widely supported rgba() notation.
 *
 * [caniuse]: https://caniuse.com/css-rrggbbaa
 *
 * @param colour the hex string, e.g. #C70000
 * @param opacity optional opacity 0-1. Defaults to 0.5 (50%)
 * @returns an functional colour string, e.g. rgba(199, 0, 0, 0.5)
 */
export const transparentColour = (
	colour: string,
	opacity = 0.5,
): `rgba(${number}, ${number}, ${number}, ${number})` => {
	// if we have an invalid string,
	if (!colour.startsWith('#') || ![4, 7].includes(colour.length)) {
		return fallback;
	}

	const hex = colour.length === 7 ? 2 : 1;

	const r = getColour(colour.slice(1, 1 + hex));
	const g = getColour(colour.slice(1 + hex, 1 + hex * 2));
	const b = getColour(colour.slice(1 + hex * 2, 1 + hex * 3));

	if ([r, g, b].some(Number.isNaN)) return fallback;

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
