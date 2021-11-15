/**
 * getName takes the given html element and returns its name attibute
 *
 * We expect the element to always be a `gu-*` custom element
 *
 * @param marker : The html element that we want to read the name attribute from;
 * @returns
 */
export const getName = (marker: HTMLElement): string | null => {
	const name = marker.getAttribute('name');
	if (!name) {
		console.error(
			`🚨 Error - no name attribute supplied. We need name to know what component to import 🚨`,
		);
	}
	return name;
};
