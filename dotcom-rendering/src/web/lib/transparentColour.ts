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
	// extract hex colours as numbers
	const r = parseInt(colour.slice(1, 3), 16);
	const g = parseInt(colour.slice(3, 5), 16);
	const b = parseInt(colour.slice(5, 7), 16);

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
