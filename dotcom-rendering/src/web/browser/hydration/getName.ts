export const getName = (marker: HTMLElement): string | null => {
	const name = marker.getAttribute('name');
	if (!name) {
		console.error(
			`🚨 Error - no name attribute supplied. We nned name to know what component to import 🚨`,
		);
	}
	return name;
};
