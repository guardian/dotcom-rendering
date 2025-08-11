/**
 * Returns `datetime` attribute from given HTML element.
 *
 * We expect the element to always be a `gu-*` custom element
 */
export const getDateTime = (marker: HTMLElement): number | undefined => {
	const dateTime = marker.getAttribute('datetime');

	if (!dateTime) {
		console.error(`Unable to find valid datetime attribute on gu-island`);
		return;
	}

	return parseInt(dateTime);
};
