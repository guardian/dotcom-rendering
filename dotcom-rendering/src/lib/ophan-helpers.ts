export const nestedOphanComponents = (...components: string[]): string =>
	components.join(' : ');

const spaces = / /g;

export const ophanComponentId = (name: string): string =>
	name.toLowerCase().replace(spaces, '-');
