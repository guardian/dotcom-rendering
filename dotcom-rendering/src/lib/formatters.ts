const integerCommas = (val: number): string => {
	const digits = val.toFixed(0).split('');
	const len = digits.length;

	for (let i = digits.length - 1; i >= 1; i -= 1) {
		if ((len - i) % 3 === 0) {
			digits.splice(i, 0, ',');
		}
	}

	return digits.join('');
};

export { integerCommas };
