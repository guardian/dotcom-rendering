/**
 * getName takes the given html element and returns its name attibute
 *
 * We expect the element to always be a `gu-*` custom element
 *
 * @param element : The html element that we want to read the name attribute from;
 * @returns
 */
export const getName = (element: HTMLElement): string | null => {
	const name = element.getAttribute('name');
	if (!name) {
		console.error(
			`🚨 Error - no name attribute supplied. We need name to know what component to import 🚨`,
		);
	}
	return name;
};
