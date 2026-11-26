const priceFormatter = new Intl.NumberFormat('en-GB', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export const formatPrice = (price: number): string =>
	priceFormatter.format(price).replace(/\.00$/, '');
