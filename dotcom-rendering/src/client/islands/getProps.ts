/**
 * getProps takes the given html element and returns its props attibute
 *
 * We expect the element to always be a `gu-*` custom element
 *
 * @param marker : The html element that we want to read the props attribute from;
 * @returns
 */
export const getProps = (marker: HTMLElement): { [key: string]: unknown } => {
	const serialised = marker.getAttribute('props');
	let props: { [key: string]: unknown };
	try {
		props = serialised && JSON.parse(serialised);
	} catch (error: unknown) {
		console.error(
			`🚨 Error parsing props. Is this data serialisable? ${String(
				serialised,
			)} 🚨`,
		);
		throw error;
	}
	return props;
};
