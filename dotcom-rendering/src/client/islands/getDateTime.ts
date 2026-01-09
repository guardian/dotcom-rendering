/**
 * Returns `datetime` attribute from given HTML element.
 *
 * We expect the element to always be a `gu-*` custom element
 */
export const getDateTime = (marker: HTMLElement): number | undefined => {
	const dateTime = marker.getAttribute('datetime');
	if (dateTime) return parseInt(dateTime);
	return;
};
