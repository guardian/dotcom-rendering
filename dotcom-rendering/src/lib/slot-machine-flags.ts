interface Flags {
	showBodyEnd: boolean;
}

export const parse = (flags: string): Flags => {
	const arr = flags.split(',');
	const args = new Set(arr);

	return {
		showBodyEnd: args.has('showBodyEnd'),
	};
};
