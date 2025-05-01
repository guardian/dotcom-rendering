const stringify = (obj: Record<string, string | number> | Array<string>) =>
	Object.entries(obj)
		.map(([key, value]) => `${key}=${value}`)
		.join(',');

export { stringify };
