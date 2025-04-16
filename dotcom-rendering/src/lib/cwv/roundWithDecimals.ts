export const roundWithDecimals = (value: number, precision = 6): number => {
	const power = Math.pow(10, precision);
	return Math.round(value * power) / power;
};
