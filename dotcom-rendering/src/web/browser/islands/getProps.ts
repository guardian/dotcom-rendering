/**
 * getProps takes the given html element and returns its props attibute
 *
 * We expect the element to always be a `gu-*` custom element
 *
 * @param marker : The html element that we want to read the props attribute from;
 * @returns
 */
export const getProps = (marker: HTMLElement): Record<string, unknown> => {
	const serialised = marker.getAttribute('props');
	let props: Record<string, unknown>;
	try {
		props = serialised && JSON.parse(serialised);
	} catch (error: unknown) {
		console.error(
			`🚨 Error parsing props. Is this data serialisable? ${serialised} 🚨`,
		);
		throw error;
	}
	return props;
};
