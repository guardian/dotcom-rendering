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
