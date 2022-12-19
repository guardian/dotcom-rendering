export const getIslandsByName = (name: string): HTMLElement[] => {
	const rawElements = document.querySelectorAll(`gu-island[name="${name}"]`);
	const elements: HTMLElement[] = [];
	rawElements.forEach((element) =>
		element instanceof HTMLElement ? elements.push(element) : null,
	);
	return elements;
};
